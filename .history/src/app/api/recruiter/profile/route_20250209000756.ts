import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      fullName,
      company,
      title,
      email,
      phone,
      bio,
      linkedIn,
      hideEmail,
      hidePhone,
    } = body;

    const profile = await prisma.recruiterProfile.create({
      data: {
        userId,
        fullName,
        company,
        title,
        email,
        phone,
        bio,
        linkedIn,
        privacySettings: {
          create: {
            hideEmail,
            hidePhone,
          },
        },
      },
      include: {
        privacySettings: true,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
} 