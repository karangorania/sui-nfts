import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SUIWalletKitProvider } from './providers';
import { Navbar } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crippy Kid NFT',
  description: 'Crippy Kid NFT on SUI Testnet 💧',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SUIWalletKitProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SUIWalletKitProvider>
    </html>
  );
}
