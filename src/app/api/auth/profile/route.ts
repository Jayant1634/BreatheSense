import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { requireAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    await dbConnect();

    // Get user data (without password)
    const userData = await User.findById(user.userId).select('-password');
    
    if (!userData) {
      return createErrorResponse('User not found', 404);
    }

    return createSuccessResponse({
      user: userData
    });

  } catch (error: unknown) {
    console.error('Profile fetch error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    if (!user) {
      return createErrorResponse('Unauthorized', 401);
    }

    await dbConnect();

    const body = await req.json();
    const { firstName, lastName, dateOfBirth, phoneNumber, address, medicalHistory, emergencyContact } = body;

    // Update user data
    const updateData: Record<string, unknown> = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = new Date(dateOfBirth);
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (address !== undefined) updateData.address = address;
    if (medicalHistory !== undefined) updateData.medicalHistory = medicalHistory;
    if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return createErrorResponse('User not found', 404);
    }

    return createSuccessResponse({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error: unknown) {
    console.error('Profile update error:', error);
    
    // Handle mongoose validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const validationError = error as unknown as { errors: Record<string, { message: string }> };
      const validationErrors = Object.values(validationError.errors).map((err: { message: string }) => err.message);
      return createErrorResponse(`Validation error: ${validationErrors.join(', ')}`, 400);
    }

    return createErrorResponse('Internal server error', 500);
  }
}
