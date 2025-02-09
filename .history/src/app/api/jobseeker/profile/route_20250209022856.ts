import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || !body.userId || !body.fullName || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or update the job seeker profile
    const profile = await prisma.jobSeekerProfile.upsert({
      where: {
        userId: body.userId,
      },
      update: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || null,
        linkedin: body.linkedin || null,
        portfolio: body.portfolio || null,
        bio: body.bio || null,
        education: {
          university: body.education.university,
          major: body.education.major,
          graduation: body.education.graduation,
          gpa: body.education.gpa,
        },
        experience: body.experience,
        skills: body.skills,
      },
      create: {
        userId: body.userId,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || null,
        linkedin: body.linkedin || null,
        portfolio: body.portfolio || null,
        bio: body.bio || null,
        education: {
          university: body.education.university,
          major: body.education.major,
          graduation: body.education.graduation,
          gpa: body.education.gpa,
        },
        experience: body.experience,
        skills: body.skills,
      },
    });

    return NextResponse.json({ data: profile });
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const profile = await prisma.jobSeekerProfile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: profile });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
} 