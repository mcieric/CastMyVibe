import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

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
          backgroundColor: '#4cc9f0',
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
          💭 GENERAL
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
          Get your daily crypto vibe!
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
}
