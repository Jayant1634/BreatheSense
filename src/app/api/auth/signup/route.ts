import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken, createErrorResponse, createSuccessResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password, firstName, lastName, role = 'patient', dateOfBirth, phoneNumber, address, medicalHistory, emergencyContact } = body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return createErrorResponse('Missing required fields: email, password, firstName, lastName');
    }

    if (password.length < 8) {
      return createErrorResponse('Password must be at least 8 characters long');
    }

    if (role && !['patient', 'admin'].includes(role)) {
      return createErrorResponse('Invalid role. Must be either "patient" or "admin"');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return createErrorResponse('User with this email already exists', 409);
    }

    // Create new user
    const userData: any = {
      email,
      password,
      firstName,
      lastName,
      role
    };

    // Add optional fields if provided
    if (dateOfBirth) userData.dateOfBirth = new Date(dateOfBirth);
    if (phoneNumber) userData.phoneNumber = phoneNumber;
    if (address) userData.address = address;
    if (medicalHistory) userData.medicalHistory = medicalHistory;
    if (emergencyContact) userData.emergencyContact = emergencyContact;

    const user = new User(userData);
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Return user data (without password) and token
    const userResponse = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      address: user.address,
      medicalHistory: user.medicalHistory,
      emergencyContact: user.emergencyContact,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return createSuccessResponse({
      message: 'User created successfully',
      user: userResponse,
      token
    }, 201);

  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return createErrorResponse(`Validation error: ${validationErrors.join(', ')}`, 400);
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return createErrorResponse('User with this email already exists', 409);
    }

    return createErrorResponse('Internal server error', 500);
  }
}
