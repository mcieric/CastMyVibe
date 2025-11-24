import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

// Force static generation
export const dynamic = 'force-static';

export async function GET() {
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
          background: 'linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%)',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '80px',
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            marginBottom: '40px',
            letterSpacing: '-2px',
          }}
        >
          CastMyVibe
        </div>
        
        <div
          style={{
            display: 'flex',
            fontSize: '36px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Daily Crypto Vibes
        </div>
        
        <div
          style={{
            display: 'flex',
            fontSize: '28px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.5,
          }}
        >
          Get your personalized crypto vibe with humor, optimism, and reality
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
