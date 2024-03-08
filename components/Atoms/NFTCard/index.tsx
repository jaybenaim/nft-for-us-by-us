import { NFT } from "@thirdweb-dev/react";
import NFTMetadata from "./NFTMetadata";

interface IProps {
  nft: NFT;
  imgOnly?: boolean;
}

const NFTCard = ({ nft, imgOnly = true }: IProps) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none flex w-full justify-center overflow-hidden rounded-t-md bg-zinc-900 lg:h-72">
        <img
          src={nft.metadata.image}
          alt={nft.metadata.description}
          className="h-full w-full object-cover object-center transition-all duration-300 will-change-auto group-hover:scale-105 lg:h-full lg:w-full"
        />
      </div>

      {!imgOnly && <NFTMetadata nft={nft} />}
    </div>
  );
};
export default NFTCard;
