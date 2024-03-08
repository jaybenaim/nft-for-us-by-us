import NFTCard from "@components/Atoms/NFTCard";
import NFTMetadata from "@components/Atoms/NFTCard/NFTMetadata";
import Spinner from "@components/Icons/Spinner";
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

      <main className="mx-auto max-h-[480px] p-16">
        {isLoading ? (
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex">
            <div className="w-1/3">
              <NFTCard nft={nft} />
            </div>

            <div>
              <NFTMetadata nft={nft} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default NFTDetail;
