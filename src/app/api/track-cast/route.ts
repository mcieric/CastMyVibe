import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(req: NextRequest) {
  try {
    const { fid, vibeId, vibeText, username } = await req.json();
    
    if (!fid || !vibeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Créer un log entry
    const logEntry = {
      fid,
      vibeId,
      vibeText,
      username: username || `User ${fid}`,
      timestamp: new Date().toISOString(),
    };

    // Stocker dans Vercel KV
    // Format: cast:timestamp:fid
    const key = `cast:${Date.now()}:${fid}`;
    await kv.set(key, logEntry);

    // Incrémenter le compteur global
    await kv.incr('total_casts');

    // Incrémenter le compteur par vibe
    await kv.incr(`vibe:${vibeId}:count`);

    // Incrémenter le compteur par user
    await kv.incr(`user:${fid}:casts`);

    return NextResponse.json({ success: true, logged: logEntry });
  } catch (error) {
    console.error('Error tracking cast:', error);
    return NextResponse.json({ error: 'Failed to track cast' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Récupérer les stats globales
    const totalCasts = await kv.get('total_casts') || 0;
    
    // Récupérer tous les logs (limité aux 100 derniers)
    const keys = await kv.keys('cast:*');
    const logs = await Promise.all(
      keys.slice(0, 100).map(async (key) => {
        return await kv.get(key);
      })
    );

    return NextResponse.json({
      totalCasts,
      recentCasts: logs.filter(Boolean).sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
