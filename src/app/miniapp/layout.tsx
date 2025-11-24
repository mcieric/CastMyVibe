import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CastMyVibe - Daily Crypto Vibes',
  description: 'Get your daily crypto vibe with humor, optimism, or reality. Roll up to 5 times and cast your favorites!',
  other: {
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: 'https://cast-my-vibe.vercel.app/api/image?text=Get your daily crypto vibe!&category=general',
      button: {
        title: 'Open CastMyVibe',
        action: {
          type: 'launch_frame',
          url: 'https://cast-my-vibe.vercel.app/miniapp',
        },
      },
    }),
  },
};

export default function MiniappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
