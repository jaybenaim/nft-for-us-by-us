import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "@constants/addresses";
import {
  NFT,
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";

interface IProps {
  nft: NFT;
  imgOnly?: boolean;
}

const NFTCard = ({ nft, imgOnly = true }: IProps) => {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

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

          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">
              {" "}
              <p>{nft.metadata.name}</p>
            </div>
            <p className="text-sm text-gray-600">Token ID #{nft.metadata.id}</p>
            <p className="text-base text-gray-700">
              {nft.metadata.description}
            </p>
          </div>
          <div className="px-6 pb-2">
            <div className="text-base text-gray-700">
              {loadingMarketplace || loadingDirectListing || loadingAuction ? (
                <p>Loading...</p>
              ) : directListing && directListing[0] ? (
                <div>
                  <p>Price</p>
                  <p>
                    {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
                  </p>
                </div>
              ) : auctionListing && auctionListing[0] ? (
                <div>
                  <p>Minimum Bid</p>
                  <p>
                    {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
                  </p>
                </div>
              ) : (
                <div>
                  <p>Price</p>
                  <p>Not Listed</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NFTCard;
