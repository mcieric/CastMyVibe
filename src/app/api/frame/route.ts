import { NextRequest } from 'next/server';
import { getUserVibeForToday, getVibeById, getRandomVibe } from '@/lib/utils';
import { vibes } from '@/lib/vibes';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData, trustedData } = body;
    
    // Extract FID from the frame message
    const fid = untrustedData?.fid || 'default';
    const buttonIndex = untrustedData?.buttonIndex || 1;
    
    // Get today's vibe for this user
    const vibe = getUserVibeForToday(fid.toString());
    
    // Handle different button actions
    switch (buttonIndex) {
      case 1:
        // Reroll button
        // In a real implementation, we would check the roll count here
        // For now, we'll just get a random vibe
        const randomVibe = getRandomVibe(vibe.id);
        return generateFrameResponse(randomVibe, fid.toString());
      
      case 2:
        // Cast This Vibe button
        // In a real implementation, we would track this in our database
        return generateCastResponse(vibe);
      
      case 3:
        // Leaderboard button
        return generateLeaderboardResponse();
      
      case 4:
        // Donate button
        return generateDonateResponse();
      
      default:
        return generateFrameResponse(vibe, fid.toString());
    }
  } catch (error) {
    console.error('Error in frame route:', error);
    return new Response('Error', { status: 500 });
  }
}

export async function GET() {
  // Initial frame
  const initialVibe = vibes[0]; // Default vibe for initial load
  
  return generateFrameResponse(initialVibe, 'default');
}

function generateFrameResponse(vibe: any, fid: string) {
  const frameResponse = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${process.env.HOST}/api/image?text=${encodeURIComponent(vibe.text)}&category=${vibe.category}" />
      <meta name="fc:frame:button:1" content="🎲 Reroll" />
      <meta name="fc:frame:button:2" content="📢 Cast This Vibe" />
      <meta name="fc:frame:button:3" content="🏆 Leaderboard" />
      <meta name="fc:frame:button:4" content="❤️ Donate" />
      <meta name="fc:frame:post_url" content="${process.env.HOST}/api/frame" />
    </head>
    <body>
      <h1>CastMyVibe</h1>
    </body>
  </html>
  `;
  
  return new Response(frameResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
    status: 200,
  });
}

function generateCastResponse(vibe: any) {
  const castText = `${vibe.text}

#CastMyVibe #crypto #farcaster

If this vibe made you smile, donations make me smile too 😌
donate: 0x4eBa8c1f1957bD8cE5ec90f665f95b8e671B9Be6`;
  
  const frameResponse = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${process.env.HOST}/api/image?text=${encodeURIComponent("Ready to cast this vibe?")}&category=general" />
      <meta name="fc:frame:button:1" content="📝 Compose Cast" />
      <meta name="fc:frame:button:2" content="⬅️ Back" />
      <meta name="fc:frame:post_url" content="${process.env.HOST}/api/frame" />
      <meta name="fc:frame:button:1:action" content="link" />
      <meta name="fc:frame:button:1:target" content="https://warpcast.com/~/compose?text=${encodeURIComponent(castText)}" />
    </head>
    <body>
      <h1>CastMyVibe</h1>
    </body>
  </html>
  `;
  
  return new Response(frameResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
    status: 200,
  });
}

function generateLeaderboardResponse() {
  // In a real implementation, we would fetch actual leaderboard data
  const leaderboardText = "Top 10 Vibes Casted:\n1. 'To the moon! But pack a parachute, just in case.' - 1,245 casts\n2. 'HODL until you're institutional.' - 987 casts\n3. 'Not your keys, not your coins.' - 876 casts\n4. 'Wen moon? Wen Lambo? Wen retirement?' - 754 casts\n5. 'Buy the rumor, sell the news.' - 643 casts\n6. 'Diamond hands aren't just about holding crypto...' - 543 casts\n7. 'Every dip is a buying opportunity.' - 432 casts\n8. 'Financial freedom isn't a dream...' - 321 casts\n9. 'Bitcoin is like my ex...' - 234 casts\n10. 'The future is decentralized...' - 123 casts";
  
  const frameResponse = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${process.env.HOST}/api/image?text=${encodeURIComponent(leaderboardText)}&category=general" />
      <meta name="fc:frame:button:1" content="⬅️ Back" />
      <meta name="fc:frame:post_url" content="${process.env.HOST}/api/frame" />
    </head>
    <body>
      <h1>CastMyVibe Leaderboard</h1>
    </body>
  </html>
  `;
  
  return new Response(frameResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
    status: 200,
  });
}

function generateDonateResponse() {
  const donateText = "If this vibe made you smile, donations make me smile too 😌\n\nDonate: 0x4eBa8c1f1957bD8cE5ec90f665f95b8e671B9Be6";
  
  const frameResponse = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${process.env.HOST}/api/image?text=${encodeURIComponent(donateText)}&category=general" />
      <meta name="fc:frame:button:1" content="❤️ Donate" />
      <meta name="fc:frame:button:2" content="⬅️ Back" />
      <meta name="fc:frame:post_url" content="${process.env.HOST}/api/frame" />
      <meta name="fc:frame:button:1:action" content="link" />
      <meta name="fc:frame:button:1:target" content="https://etherscan.io/address/0x4eBa8c1f1957bD8cE5ec90f665f95b8e671B9Be6" />
    </head>
    <body>
      <h1>CastMyVibe Donate</h1>
    </body>
  </html>
  `;
  
  return new Response(frameResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
    status: 200,
  });
}