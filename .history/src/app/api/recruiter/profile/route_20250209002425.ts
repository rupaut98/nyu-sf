// src/app/api/recruiter/profile/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

export async function POST(req: Request) {
  try {
    // Use formData() since the client is sending FormData (multipart/form-data)
    const formData = await req.formData();

    // Extract text fields (they come as FormDataEntryValue, so convert to string)
    const name = formData.get('name')?.toString();
    const bio = formData.get('bio')?.toString();

    // Extract files
    const image = formData.get('image');
    const voice = formData.get('voice');

    // Validate required fields
    if (!name || !image || !voice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Process the file uploads (image and voice) as needed.
    // For example, you might upload them to cloud storage and get back URLs.
    // For now, we’ll assume you have some processing function that returns a URL.
    const imageUrl = await processUploadedFile(image); // You need to implement this.
    const voiceCloneId = await processUploadedFile(voice); // And this.

    // Adjust the fields below as needed. Notice the mismatch:
    // - Your client sends "name" and "bio"
    // - Your Prisma schema seems to expect fields like "userId", "fullName", "company", "title", etc.
    //
    // Make sure you update this code so that the fields from the client match what you want to store.
    //
    // For demonstration, we’ll create a simplified recruiter profile:
    const profile = await prisma.recruiterProfile.create({
      data: {
        fullName: name,
        bio: bio || null,
        imageUrl,       // from your file processing
        voiceCloneId,   // from your file processing
        // Add other fields as necessary, or adjust your Prisma schema accordingly.
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

// Dummy file processing function for demonstration
async function processUploadedFile(file: FormDataEntryValue) {
  // In a real implementation, you might:
  // - Convert the File to a Buffer/Stream
  // - Upload it to cloud storage (e.g., AWS S3, Cloudinary, etc.)
  // - Return the URL or an identifier for the uploaded file
  return 'https://example.com/path-to-uploaded-file';
}
