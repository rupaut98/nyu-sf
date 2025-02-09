import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  // Await the params promise to access the userId
  const { userId } = await params;

  try {
    const profile = await prisma.recruiterProfile.findFirst({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ exists: false }, { status: 404 });
    }

    return NextResponse.json({ exists: true, profile }, { status: 200 });
  } catch (error) {
    console.error('Error checking profile:', error);
    return NextResponse.json({ error: 'Failed to check profile' }, { status: 500 });
  }
}
