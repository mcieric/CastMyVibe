import { NextRequest } from 'next/server';
import { getVibeById } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ vibeId: string }> }
) {
  const { vibeId } = await params;
  const vibe = getVibeById(parseInt(vibeId));
  
  if (!vibe) {
    return new Response('Vibe not found', { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://cast-my-vibe.vercel.app';
  const imageUrl = `${baseUrl}/api/image?vibeId=${vibeId}`;
  const miniappUrl = 'https://farcaster.xyz/miniapps/GjHPuTrL8tkG/castmyvibe';

  // Return an HTML page with Open Graph meta tags and auto-redirect
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CastMyVibe - ${vibe.category}</title>
    
    <!-- Farcaster Frame Meta Tags -->
    <meta property="fc:frame" content="vNext">
    <meta property="fc:frame:image" content="${imageUrl}">
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1">
    <meta property="fc:frame:button:1" content="🎲 Open CastMyVibe">
    <meta property="fc:frame:button:1:action" content="link">
    <meta property="fc:frame:button:1:target" content="${miniappUrl}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="CastMyVibe - ${vibe.category}">
    <meta property="og:description" content="${vibe.text}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:url" content="${miniappUrl}">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="CastMyVibe - ${vibe.category}">
    <meta name="twitter:description" content="${vibe.text}">
    <meta name="twitter:image" content="${imageUrl}">
    
    <!-- Auto-redirect for web browsers -->
    <meta http-equiv="refresh" content="0; url=${miniappUrl}">
    
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        background: linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%);
        color: white;
        text-align: center;
        padding: 20px;
      }
      .container {
        max-width: 600px;
      }
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
      a {
        color: #4cc9f0;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🎲 CastMyVibe</h1>
      <p>Redirecting to the miniapp...</p>
      <p>If you're not redirected, <a href="${miniappUrl}">click here</a></p>
    </div>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
