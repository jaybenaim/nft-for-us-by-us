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
}

const NFTCard = ({ nft }: IProps) => {
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
    <div>
      <div>
        <ThirdwebNftMedia
          metadata={nft.metadata}
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          width="720"
          height="480"
        />
      </div>
      <p>Token ID #{nft.metadata.id}</p>
      <p>{nft.metadata.name}</p>
      <div>
        {loadingMarketplace || loadingDirectListing || loadingAuction ? (
          <p>Loading...</p>
        ) : directListing && directListing[0] ? (
          <div>
            <div>
              <p>Price</p>
              <p>
                {`${directListing[0]?.currencyValuePerToken.displayValue}
															${directListing[0]?.currencyValuePerToken.symbol}`}
              </p>
            </div>
          </div>
        ) : auctionListing && auctionListing[0] ? (
          <div>
            <div>
              <p>Minimum Bid</p>
              <p>
                {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue}
														${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <p>Price</p>
              <p>Not Listed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default NFTCard;
