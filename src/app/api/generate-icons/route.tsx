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
            background: 'linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #00c8ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-8px',
            display: 'flex',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            WebkitTextStroke: '3px white',
            paintOrder: 'stroke fill',
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