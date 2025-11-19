import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Return the splash image for all requests
    const baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://cast-my-vibe.vercel.app';
    const imageUrl = `${baseUrl}/splash.png`;
    
    // Redirect to the static image
    return NextResponse.redirect(imageUrl);
  } catch (error) {
    console.error('Error serving image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}