import Skeleton from "@components/Atoms/Skeleton";
import NFTCard from "@components/Molecules/NFTCard";
import { NFT_COLLECTION_ADDRESS } from "@constants/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const { contract: nftContract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(nftContract);

  return (
    <main className="max-w-9xl mx-auto p-4 px-16">
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex h-full max-w-full items-center justify-center">
              <Image
                alt="Two overlapped faces"
                src="/face-outline.svg"
                layout="fill"
                objectFit="cover"
                priority
              />
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>

          <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
            What can you create?
          </h1>

          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            NFT's created by us, sold by us.
          </p>
        </div>

        {isLoading && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-8">
            <Skeleton />

            <Skeleton />

            <Skeleton />

            <Skeleton />
          </div>
        )}

        {data?.map((nft) => (
          <Link
            key={nft?.metadata?.id}
            href={`/view/${nft?.metadata?.id}`}
            shallow
            className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <NFTCard
              key={nft.metadata.id}
              nft={nft}
              size="h-[420px] w-full"
              contain={false}
              border
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
