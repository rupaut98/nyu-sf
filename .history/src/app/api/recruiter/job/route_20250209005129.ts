import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || !body.userId || !body.title || !body.company || !body.location || !body.type || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // First, get the recruiter's profile
    const recruiterProfile = await prisma.recruiterProfile.findFirst({
      where: {
        userId: body.userId,
      },
    });

    if (!recruiterProfile) {
      return NextResponse.json(
        { error: 'Recruiter profile not found' },
        { status: 404 }
      );
    }

    // Create the job posting
    const job = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        type: body.type,
        description: body.description,
        salary: body.salary || null,
        requirements: body.requirements.filter((req: string) => req.trim() !== ''),
        recruiterId: recruiterProfile.id,
      },
    });

    return NextResponse.json({ data: job });
  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create job posting' },
      { status: 500 }
    );
  }
} 