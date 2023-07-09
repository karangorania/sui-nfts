'use client';
import Image from 'next/image';
import { crippy_kid } from '../assets';

import { TransactionBlock } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [digest, setDigest] = useState<string | null>(null);

  const mint = async () => {
    try {
      const tx = new TransactionBlock();

      tx.moveCall({
        target: `${process.env.NEXT_PUBLIC_PACKAGE_ID}::infected_kid::mint`,
      });

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      setDigest(result.digest);
      console.log(result.digest);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="w-full max-w-3xl px-4 py-8 flex flex-col mt-[10%] items-center shadow rounded-lg mx-auto">
      <div className="h-96 w-96">
        <Image
          src={crippy_kid}
          width={512}
          height={512}
          alt="SUI Mainnet"
          className="h-full w-full object-cover rounded-lg shadow-2xl hover:scale-110"
        />
      </div>

      <div className="mt-[5%]">
        <button
          type="submit"
          className="hover:bg-[#2A4361] bg-[#0084AD] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          onClick={mint}
        >
          Mint
        </button>
      </div>

      {digest && (
        <div className="mt-[5%]">
          <Link
            href={`https://suiexplorer.com/txblock/${digest}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-[#2A4361] bg-[#0084AD] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            View on Explorer
          </Link>
        </div>
      )}
    </main>
  );
}
