import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  description: "Get your daily dose of crypto vibes - humor, optimism, and reality!",
  openGraph: {
    title: "CastMyVibe - Daily Crypto Vibes",
    description: "Your daily crypto vibe generator. 300+ vibes to match your mood.",
    images: [
      {
        url: "https://cast-my-vibe.vercel.app/splash.png",
        width: 512,
        height: 512,
        alt: "CastMyVibe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CastMyVibe - Daily Crypto Vibes",
    description: "Your daily crypto vibe generator. 300+ vibes to match your mood.",
    images: ["https://cast-my-vibe.vercel.app/splash.png"],
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
        {children}
      </body>
    </html>
  );
}
