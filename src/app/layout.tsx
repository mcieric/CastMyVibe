import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CastMyVibe - Daily Crypto Vibes",
  description: "Daily crypto vibes with humor and optimism for the Farcaster community",
  openGraph: {
    title: "CastMyVibe",
    description: "Get your daily crypto vibe. Roll, share, and spread good vibes in the Farcaster community.",
    images: ["https://cast-my-vibe.vercel.app/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CastMyVibe",
    description: "Get your daily crypto vibe. Roll, share, and spread good vibes in the Farcaster community.",
    images: ["https://cast-my-vibe.vercel.app/hero.png"],
  },
  other: {
    'fc:miniapp': JSON.stringify({
      version: "next",
      imageUrl: "https://cast-my-vibe.vercel.app/hero.png",
      button: {
        title: "🎲 Get Your Vibe",
        action: {
          type: "launch_miniapp",
          name: "CastMyVibe",
          url: "https://cast-my-vibe.vercel.app"
        }
      }
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
