import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const profile = await prisma.recruiterProfile.findFirst({
      where: {
        userId: params.userId,
      },
    });

    return NextResponse.json({ hasProfile: !!profile });
  } catch (error) {
    console.error('Error checking profile:', error);
    return NextResponse.json({ hasProfile: false });
  }
} 