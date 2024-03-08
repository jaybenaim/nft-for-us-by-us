import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "@constants/addresses";
import {
  NFT,
  useContract,
  useCreateDirectListing,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useState } from "react";
import Input from "../Inputs/Input";

interface IProps {
  nft: NFT;
}

const NFTMetadata = ({ nft }: IProps) => {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  const { contract: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    "nft-collection"
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

  const [bidValue, setBidValue] = useState(0);

  const handleBuyListing = async () => {
    let txResult;

    //Add for auction section
    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.buyoutAuction(
        auctionListing[0].id
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No listing found");
    }

    return txResult;
  };

  const handleCreateBid = async () => {
    let txResult;
    if (!bidValue) {
      return;
    }

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.makeBid(
        auctionListing[0].id,
        bidValue
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.offers.makeOffer({
        assetContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        totalPrice: bidValue,
      });
    } else {
      throw new Error("No listing found");
    }
    return txResult;
  };

  const checkAndProvideApproval = async () => {
    const ownerId = await nftCollection.owner.get();
    const hasApproval = await nftCollection?.call(
      "isApprovedForAll",
      ownerId as any,
      MARKETPLACE_ADDRESS as any
    );

    if (hasApproval) console.log("Approval provided");

    if (!hasApproval) {
      const txResult = await nftCollection?.call(
        "setApprovalForAll",
        MARKETPLACE_ADDRESS as any,
        true as any
      );

      if (txResult) {
        console.log("Approval provided");
      }
    }

    return true;
  };

  return (
    <>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          {" "}
          <p>{nft.metadata.name}</p>
        </div>
        <p className="text-sm text-gray-600">Token ID #{nft.metadata.id}</p>
        <p className="text-base text-gray-700">{nft.metadata.description}</p>
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
              <button onClick={() => handleBuyListing()}>Buy</button>
            </div>
          ) : auctionListing && auctionListing[0] ? (
            <div>
              <p>Minimum Bid</p>
              <p>
                {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
              </p>
              <Input
                id="bid"
                label="Bid"
                value={bidValue}
                type="number"
                min={0}
                max={1000000}
                step={1}
                placeholder="Enter your bid"
              />
              <button onClick={() => handleCreateBid()}>Bid</button>
            </div>
          ) : (
            <div>
              <p>Price</p>
              <p>Not Listed</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NFTMetadata;
