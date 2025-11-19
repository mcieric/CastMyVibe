import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'farcaster.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const manifest = JSON.parse(fileContents);

    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving farcaster.json:', error);
    return NextResponse.json(
      { error: 'Manifest not found' },
      { status: 404 }
    );
  }
}
