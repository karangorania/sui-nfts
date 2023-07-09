'use client';
import React from 'react';
import Link from 'next/link';
import { ConnectButton } from '@mysten/wallet-kit';

const Nav = () => {
  return (
    <>
      <nav className="sticky top-0 z-10 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl text-[#0084AD] font-semibold">
              SUI NFT
            </Link>

            <div className="">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
