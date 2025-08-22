import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken, createErrorResponse, createSuccessResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return createErrorResponse('Email and password are required');
    }

    // Find user by email and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return createErrorResponse('Invalid email or password', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      return createErrorResponse('Account is deactivated. Please contact support.', 403);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return createErrorResponse('Invalid email or password', 401);
    }

    // Update last login
    user.lastLogin = new Date();
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
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return createSuccessResponse({
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
