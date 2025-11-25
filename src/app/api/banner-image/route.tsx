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
          background: 'linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '80px',
            fontWeight: 900,
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          CastMyVibe
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 500,
            color: '#e0aaff',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          Daily Crypto Vibes
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#c77dff',
            textAlign: 'center',
            maxWidth: '800px',
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        >
          Get your personalized crypto vibe with humor, optimism, and reality
        </div>
      </div>
    ),
    {
      width: 1002,
      height: 548,
    }
  );
}
