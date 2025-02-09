import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || !body.userId || !body.fullName || !body.company || !body.title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const profile = await prisma.recruiterProfile.create({
      data: {
        userId: body.userId,
        fullName: body.fullName,
        company: body.company,
        title: body.title,
        email: body.email || null,
        phone: body.phone || null,
        bio: body.bio || null,
        linkedIn: body.linkedIn || null,
        privacySettings: {
          create: {
            hideEmail: body.hideEmail || false,
            hidePhone: body.hidePhone || false,
          },
        },
      },
      include: {
        privacySettings: true,
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