import NFTCard from "@components/Atoms/NFTCard";
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
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        [...data, ...data].map((nft) =>
          !overrideOnclickBehavior ? (
            <Link href={`/view/${nft.metadata.id}`} key={nft.metadata.id}>
              <NFTCard nft={nft} imgOnly={false} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFTCard nft={nft} imgOnly={false} />
            </div>
          )
        )
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
};

export default NFTGrid;
