import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text') || 'Welcome to CastMyVibe!';
    const category = searchParams.get('category') || 'general';
    
    // Define colors for each category with violet/blue gradient as base
    const categoryColors: Record<string, string> = {
      humor: 'linear-gradient(135deg, #7b2cbf 0%, #5a189a 100%)',
      optimistic: 'linear-gradient(135deg, #74c69d 0%, #40916c 100%)',
      depressive: 'linear-gradient(135deg, #5a189a 0%, #240046 100%)',
      general: 'linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%)',
      motivational: 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)',
      punchline: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)'
    };
    
    // Default to violet/blue gradient
    const bgColor = categoryColors[category] || 'linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%)';
    
    return new ImageResponse(
      (
        <div
          style={{
            background: bgColor,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.4,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '90%',
              wordBreak: 'break-word',
            }}
          >
            {text}
          </div>
          
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              display: 'flex',
              fontSize: 28,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            #{category}
          </div>
          
          <div
            style={{
              position: 'absolute',
              top: '30px',
              display: 'flex',
              fontSize: 32,
              fontWeight: 700,
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            CASTMYVIBE.DAILY
          </div>
        </div>
      ),
      {
        width: 800,
        height: 418,
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}