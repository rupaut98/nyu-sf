import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // First get the recruiter profile
    const recruiterProfile = await prisma.recruiterProfile.findFirst({
      where: {
        userId: params.userId,
      },
    });

    if (!recruiterProfile) {
      return NextResponse.json(
        { error: 'Recruiter profile not found' },
        { status: 404 }
      );
    }

    // Then get all jobs for this recruiter
    const jobs = await prisma.job.findMany({
      where: {
        recruiterId: recruiterProfile.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
} 