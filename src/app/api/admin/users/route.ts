import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { requireAdmin, createErrorResponse, createSuccessResponse } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return createErrorResponse('Admin access required', 403);
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    // Build query
    const query: Record<string, unknown> = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get users with pagination
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await User.countDocuments(query);

    return createSuccessResponse({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: unknown) {
    console.error('Admin users fetch error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return createErrorResponse('Admin access required', 403);
    }

    await dbConnect();

    const body = await req.json();
    const { userId, action, data } = body;

    if (!userId || !action) {
      return createErrorResponse('User ID and action are required');
    }

    let updateData: Record<string, unknown> = {};

    switch (action) {
      case 'updateStatus':
        if (typeof data.isActive !== 'boolean') {
          return createErrorResponse('isActive must be a boolean');
        }
        updateData.isActive = data.isActive;
        break;

      case 'updateRole':
        if (!['patient', 'admin'].includes(data.role)) {
          return createErrorResponse('Invalid role');
        }
        updateData.role = data.role;
        break;

      case 'updateProfile':
        updateData = { ...data };
        // Remove sensitive fields
        delete updateData.password;
        delete updateData._id;
        delete updateData.createdAt;
        delete updateData.updatedAt;
        break;

      default:
        return createErrorResponse('Invalid action');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return createErrorResponse('User not found', 404);
    }

    return createSuccessResponse({
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error: unknown) {
    console.error('Admin user update error:', error);
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const validationError = error as unknown as { errors: Record<string, { message: string }> };
      const validationErrors = Object.values(validationError.errors).map((err: { message: string }) => err.message);
      return createErrorResponse(`Validation error: ${validationErrors.join(', ')}`, 400);
    }

    return createErrorResponse('Internal server error', 500);
  }
}
