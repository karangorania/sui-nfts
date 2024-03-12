'use client';
import Image from 'next/image';
import { crippy_kid } from '../assets';

import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { useCurrentAccount, useSignTransactionBlock } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const currentAcc = useCurrentAccount();
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
  const [digest, setDigest] = useState<string | null>(null);

  const mint = async () => {
    try {
      const tx = new TransactionBlock();

      tx.moveCall({
        target: `${process.env.NEXT_PUBLIC_PACKAGE_ID}::infected_kid::mint`,
      });

      const response = await signAndExecuteTransactionBlock(
        {
          transactionBlock: tx,
          options: {
            showEffects: true,
            showBalanceChanges: true,
            showEvents: true,
          },
        },
        {
          onSuccess: (result) => {
            console.log(result);
            setDigest(result.digest);
          },
        }
      );
      console.log(response);
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
