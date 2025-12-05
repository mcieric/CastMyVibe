'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { ReactNode } from 'react';
import { base } from 'wagmi/chains';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'default',
          name: 'CastMyVibe',
        },
      }}
      miniKit={{
        enabled: true
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
