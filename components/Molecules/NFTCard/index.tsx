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
          "aspect-h-1 aspect-w-1 lg:aspect-none flex justify-center overflow-hidden dark:border-gray-700/60 dark:text-gray-300/90",
          imgOnly
            ? "rounded-lg border-none"
            : "rounded-t-lg border-x-[0.05px] border-t-[0.05px]",
          size
        )}
      >
        <img
          src={nft.metadata.image}
          alt={nft.metadata.description}
          className={classNames(
            imgOnly ? "rounded-lg object-cover" : "object-contain",
            "h-full w-full object-center transition-all duration-300 will-change-auto group-hover:scale-110 lg:h-full lg:w-full"
          )}
        />
      </div>

      {!imgOnly && <NFTMetadata nft={nft} />}
    </div>
  );
};
export default NFTCard;
