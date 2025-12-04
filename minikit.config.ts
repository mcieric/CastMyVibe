/**
 * MiniKit Configuration for Base App Integration
 * This config generates the farcaster.json manifest and metadata
 */

const ROOT_URL = process.env.NEXT_PUBLIC_HOST || 'https://cast-my-vibe.vercel.app';

export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjQ3Njc3OCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDRlQmE4YzFmMTk1N2JEOGNFNWVjOTBmNjY1Zjk1YjhlNjcxQjlCZTYifQ",
    payload: "eyJkb21haW4iOiJjYXN0LW15LXZpYmUudmVyY2VsLmFwcCJ9",
    signature: "dbuPt8+1ZrZPlm+pesPDyW2N+iMt09M/JWR5/Juyg1R4DlStD0kLrNA6+zoi9z2vsoAOKgE8Q22Q9AjZCQ52nBs="
  },
  baseBuilder: {
    ownerAddress: "0x939E33ed6661B9C1e381c4666F67AB816aA09afE"
  },
  miniapp: {
    version: "1",
    name: "CastMyVibe",
    subtitle: "Daily crypto vibes",
    description: "Get your daily crypto vibe with humor, optimism or reality. Roll up to 5 times and cast your favorites! Share your mood with the Farcaster community.",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-1.png`,
      `${ROOT_URL}/screenshot-2.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#7209b7",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "entertainment",
    tags: ["crypto", "humor", "vibes", "daily", "fun", "social", "farcaster"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    imageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Daily dose of crypto vibes",
    ogTitle: "CastMyVibe - Daily Crypto Vibes",
    ogDescription: "Get your personalized daily crypto vibe! Roll, share, and spread good vibes in the Farcaster community.",
    ogImageUrl: `${ROOT_URL}/hero.png`,
    castShareUrl: ROOT_URL,
    noindex: false
  }
} as const;

export default minikitConfig;
