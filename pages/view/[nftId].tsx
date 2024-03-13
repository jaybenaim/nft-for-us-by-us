import Spinner from "@components/Icons/Spinner";
import BuyNFT from "@components/Molecules/BuyNFT";
import NFTCard from "@components/Molecules/NFTCard";
import NFTMetadata from "@components/Molecules/NFTCard/NFTMetadata";
import { NFT_COLLECTION_ADDRESS } from "@constants/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const NFTDetail: NextPage = () => {
  const router = useRouter();
  const { nftId } = router.query;

  const { contract: nftContract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data: nfts, isLoading } = useNFTs(nftContract);

  const nft = nfts?.find((n) => n?.metadata?.id == nftId);

  return (
    <>
      <Head>
        <title>{nft?.metadata.name}</title>
        <meta property="og:image" content={nft?.metadata.image} />
        <meta name="twitter:image" content={nft?.metadata.image} />
      </Head>

      <main className="mx-auto max-h-[480px] p-4 lg:p-16">
        {isLoading ? (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex justify-center first-of-type:*:rounded-lg">
              <NFTCard nft={nft} imgOnly contain size="w-[360px]" />
            </div>

            <div className="space-y-4 first-of-type:*:rounded-lg">
              <NFTMetadata nft={nft} />
              <BuyNFT nft={nft} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default NFTDetail;
