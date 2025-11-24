import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CastMyVibe - Daily Crypto Vibes',
  description: 'Get your daily crypto vibe with humor, optimism, or reality. Roll up to 5 times and cast your favorites!',
  openGraph: {
    title: 'CastMyVibe - Daily Crypto Vibes',
    description: 'Get your daily crypto vibe with humor optimism or reality. Roll up to 5 times and cast your favorites',
    images: ['https://cast-my-vibe.vercel.app/hero.png'],
  },
  other: {
    'fc:miniapp': '{"version":"next","imageUrl":"https://cast-my-vibe.vercel.app/hero.png","button":{"title":"Open CastMyVibe","action":{"type":"launch_frame","url":"https://cast-my-vibe.vercel.app/miniapp"}}}',
  },
};

export default function MiniappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
