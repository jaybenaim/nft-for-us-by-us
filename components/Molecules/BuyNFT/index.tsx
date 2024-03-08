import Input from "@components/Atoms/Inputs/Input";
import DefaultModal from "@components/Organisms/Modal/DefaultModal";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "@constants/addresses";
import {
  NFT,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useState } from "react";
import CreateListingForm from "../CreateListingForm";

interface IProps {
  nft: NFT;
}

const BuyNFT = ({ nft }: IProps) => {
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

  const [bidValue, setBidValue] = useState(0);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [openCreateListing, setOpenCreateListing] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState<string | null>(null);
  const [loadedOnce, setLoadedOnce] = useState<boolean>(false);

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

  return (
    <div>
      <div className="px-4 pb-2">
        <div className="text-base text-gray-700 dark:text-gray-300/90">
          {loadingMarketplace || !loadedOnce ? (
            <p>Loading...</p>
          ) : directListing && directListing[0] ? (
            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300/90">
              <p>{currentPrice}</p>

              {!isOwner && (
                <button
                  onClick={() => handleBuyListing()}
                  className="mt-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-500 dark:text-white"
                >
                  Buy
                </button>
              )}
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
                handleOnChange={(value: number) => setBidValue(value)}
                placeholder="Enter your bid"
              />
              <button onClick={() => handleCreateBid()}>Bid</button>
            </div>
          ) : (
            <div>
              <p>Price</p>
              <p>Not Listed</p>

              {/* Modal is closed */}
              {isOwner && !currentPrice && !openCreateListing && (
                <button
                  className="mt-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-500 dark:text-white"
                  onClick={() => setOpenCreateListing(true)}
                >
                  Create Direct Listing
                </button>
              )}
            </div>
          )}

          {/* Modal is open */}
          {nft && isOwner && !currentPrice && openCreateListing && (
            <DefaultModal handleClose={() => setOpenCreateListing(false)}>
              <CreateListingForm nft={nft} />
            </DefaultModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNFT;
