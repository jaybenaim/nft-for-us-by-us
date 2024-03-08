import { NFT, ThirdwebNftMedia } from "@thirdweb-dev/react";
import NFTMetadata from "./NFTMetadata";

interface IProps {
  nft: NFT;
  imgOnly?: boolean;
}

const NFTCard = ({ nft, imgOnly = true }: IProps) => {
  return (
    <div className=" text-white">
      {imgOnly ? (
        <ThirdwebNftMedia
          metadata={nft.metadata}
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          width="720"
          height="480"
        />
      ) : (
        <div className="max-w-sm overflow-hidden rounded shadow-lg">
          <ThirdwebNftMedia
            metadata={nft.metadata}
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            width="720"
            height="480"
          />

          <NFTMetadata nft={nft} />
        </div>
      )}
    </div>
  );
};
export default NFTCard;
