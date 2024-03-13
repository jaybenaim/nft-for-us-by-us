import { NFT } from "@thirdweb-dev/react";
import classNames from "classnames";
import NFTMetadata from "./NFTMetadata";

interface IProps {
  nft: NFT;
  imgOnly?: boolean;
  size?: string;
}

const NFTCard = ({
  nft,
  imgOnly = true,
  size = "h-[450px] w-[450px]",
}: IProps) => {
  return (
    <div className="group relative">
      <div
        className={classNames(
          "aspect-h-1 aspect-w-1 lg:aspect-none flex justify-center overflow-hidden bg-zinc-900",
          imgOnly ? "rounded-lg" : " rounded-t-lg",
          size
        )}
      >
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
