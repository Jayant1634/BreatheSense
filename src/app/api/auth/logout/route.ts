import { NextRequest } from 'next/server';
import { createSuccessResponse } from '@/lib/auth';

export async function POST() {
  try {
    // Note: JWT tokens are stateless, so server-side logout is not possible
    // The client should remove the token from storage
    // This endpoint provides a consistent API structure
    
    return createSuccessResponse({
      message: 'Logout successful'
    });

  } catch (error: unknown) {
    console.error('Logout error:', error);
    return createSuccessResponse({
      message: 'Logout successful'
    });
  }
}
