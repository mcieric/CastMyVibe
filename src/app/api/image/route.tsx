import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getVibeById } from '@/lib/utils';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Support both vibeId and text/category parameters
    const vibeId = searchParams.get('vibeId');
    let text = searchParams.get('text') || 'Welcome to CastMyVibe!';
    let category = searchParams.get('category') || 'general';
    
    // If vibeId is provided, fetch the vibe
    if (vibeId) {
      const vibe = getVibeById(parseInt(vibeId));
      if (vibe) {
        text = vibe.text;
        category = vibe.category;
      }
    }
    
    // Define colors for each category
    const categoryColors: Record<string, string> = {
      humor: '#7b2cbf',
      optimistic: '#74c69d',
      depressive: '#5a189a',
      general: '#4cc9f0',
      motivational: '#f72585',
      punchline: '#4361ee',
      meme: '#7209b7'
    };
    
    const categoryEmojis: Record<string, string> = {
      humor: '😂',
      optimistic: '🚀',
      depressive: '😢',
      general: '💭',
      motivational: '💪',
      punchline: '🎯',
      meme: '🎲'
    };
    
    const bgColor = categoryColors[category] || '#7209b7';
    const emoji = categoryEmojis[category] || '✨';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor,
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              padding: '12px 30px',
              marginBottom: '40px',
              fontSize: '28px',
              fontWeight: 700,
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            {emoji} {category}
          </div>
          
          <div
            style={{
              display: 'flex',
              fontSize: '48px',
              fontStyle: 'italic',
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '90%',
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            {text}
          </div>
          
          <div
            style={{
              display: 'flex',
              marginTop: '50px',
              fontSize: '32px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '2px',
            }}
          >
            CASTMYVIBE
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}