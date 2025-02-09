import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable body parsing, we'll handle the multipart form-data manually
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse form data
const parseForm = async (req: Request): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

// Mock function for voice cloning API call
async function cloneVoice(voiceFile: string) {
  // In production, integrate with ElevenLabs or Resemble AI
  return { voiceCloneId: 'mock-voice-id-' + Date.now() };
}

export async function POST(req: Request) {
  try {
    // Parse the multipart form data
    const { fields, files } = await parseForm(req);
    
    // Get the uploaded files
    const imageFile = files.image[0];
    const voiceFile = files.voice[0];

    // In production, upload files to cloud storage (S3, etc.)
    // For demo, we'll use local paths
    const imageUrl = `/uploads/${path.basename(imageFile.filepath)}`;

    // Clone the voice (mock implementation)
    const { voiceCloneId } = await cloneVoice(voiceFile.filepath);

    // Create the profile response
    const profile = {
      name: fields.name,
      bio: fields.bio,
      imageUrl,
      voiceCloneId,
    };

    // In production, save profile to database here

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error processing profile:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
} 