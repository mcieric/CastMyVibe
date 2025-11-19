import { NextRequest } from 'next/server';
import { getVibeById } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ vibeId: string }> }
) {
  try {
    const { vibeId: vibeIdStr } = await params;
    const vibeId = parseInt(vibeIdStr);
    const vibe = getVibeById(vibeId);
    
    if (!vibe) {
      return new Response('Vibe not found', { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://cast-my-vibe.vercel.app';
    const imageUrl = `${baseUrl}/api/image?text=${encodeURIComponent(vibe.text)}&category=${vibe.category}`;

    const frameHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="Get Your Daily Vibe" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${baseUrl}/miniapp" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:title" content="CastMyVibe" />
    <meta property="og:description" content="${vibe.text}" />
    
    <title>CastMyVibe - ${vibe.category}</title>
  </head>
  <body>
    <h1>CastMyVibe</h1>
    <p>${vibe.text}</p>
    <p>Category: ${vibe.category}</p>
  </body>
</html>
    `;

    return new Response(frameHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating cast frame:', error);
    return new Response('Error', { status: 500 });
  }
}