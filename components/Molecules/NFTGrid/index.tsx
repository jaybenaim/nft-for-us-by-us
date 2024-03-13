import NFTCard from "@components/Molecules/NFTCard";
import { NFT } from "@thirdweb-dev/react";
import Link from "next/link";

interface IProps {
  isLoading: boolean;
  data: NFT[];
  overrideOnclickBehavior?: (nft: NFT) => void;
  emptyText?: string;
}

const NFTGrid = ({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found",
}: IProps) => {
  return (
    <>
      {isLoading ? (
        <div />
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link href={`/view/${nft.metadata.id}`} key={nft.metadata.id}>
              <NFTCard nft={nft} imgOnly={false} size="w-full h-[280px]" />
            </Link>
          ) : (
            <button
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFTCard nft={nft} imgOnly={false} size="w-full h-[280px]" />
            </button>
          )
        )
      ) : (
        <p>{emptyText}</p>
      )}
    </>
  );
};

export default NFTGrid;
