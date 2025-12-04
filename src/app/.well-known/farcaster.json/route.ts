import { NextResponse } from 'next/server';
import minikitConfig from '../../../../minikit.config';

/**
 * Dynamic route to serve the farcaster.json manifest
 * This allows the manifest to use environment variables
 */
export async function GET() {
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation,
    baseBuilder: minikitConfig.baseBuilder,
    miniapp: minikitConfig.miniapp
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
