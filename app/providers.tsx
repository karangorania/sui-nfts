'use client';
import { FC, ReactNode } from 'react';
import { WalletKitProvider } from '@mysten/wallet-kit';

interface SUIWalletKitProviderProps {
  children: ReactNode;
}

export const SUIWalletKitProvider: FC<SUIWalletKitProviderProps> = ({
  children,
}) => {
  return (
    <WalletKitProvider
      features={['sui:signTransactionBlock']}
      enableUnsafeBurner
    >
      {children}
    </WalletKitProvider>
  );
};
