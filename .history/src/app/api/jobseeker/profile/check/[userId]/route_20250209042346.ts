import { NextRequest } from 'next/server';
import { prisma } from '@lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const profile = await prisma.jobSeekerProfile.findUnique({
      where: { userId: params.userId }
    });

    if (!profile) {
      return Response.json({ exists: false }, { status: 404 });
    }

    return Response.json({ exists: true, profile }, { status: 200 });
  } catch (error) {
    console.error('Error checking profile:', error);
    return Response.json({ error: 'Failed to check profile' }, { status: 500 });
  }
}
