import { ImageResponse } from '@vercel/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-8px',
            display: 'flex',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(138, 43, 226, 0.6)',
          }}
        >
          CastMyVibe
        </div>
        <div
          style={{
            fontSize: 120,
            marginTop: 30,
            display: 'flex',
          }}
        >
          🎲
        </div>
      </div>
    ),
    {
      width: 1024,
      height: 1024,
    }
  );
}