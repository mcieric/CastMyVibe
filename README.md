# CastMyVibe

A daily crypto vibe frame for Farcaster with a touch of humor, optimism, and reality.

## Features

- 🎲 Daily personalized crypto vibes
- 🔁 5 reroll attempts per day
- 📢 Cast your favorite vibes with pre-filled text
- 🏆 Global leaderboard of most casted vibes
- ❤️ Donation option
- 🌈 Beautiful violet/blue gradient design

## How to Use

1. Deploy the app to Vercel (see deployment instructions below)
2. Add the frame URL to your Farcaster frame:
   ```
   https://your-deployed-url/api/frame
   ```
3. Users can interact with the frame to get their daily vibe, reroll, cast vibes, view leaderboard, or donate

## Categories

- **Humor**: Light-hearted crypto jokes
- **Optimistic**: Bullish perspectives
- **Depressive**: Bearish realities
- **General**: Daily mood reflections
- **Motivational**: Inspiring crypto wisdom
- **Punchlines**: Memorable one-liners

## Deployment

1. Fork this repository
2. Create a new project on Vercel
3. Connect your forked repository
4. Set the following environment variables in Vercel:
   - `HOST`: Your deployed URL (e.g., https://cast-my-vibe.vercel.app)
5. Deploy!

## Development

To run the app locally:

```bash
npm run dev
```

The app will be available at http://localhost:3000

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Vercel OG for image generation
- Farcaster Frames API

## Donation

If you like this project, consider donating:

**Ethereum Address**: 0x4eBa8c1f1957bD8cE5ec90f665f95b8e671B9Be6

## License

MIT