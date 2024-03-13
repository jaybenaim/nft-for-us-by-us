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
import { useEffect, useState } from "react";

interface IProps {
  nft: NFT;
  includeDescription?: boolean;
}

const NFTMetadata = ({ nft, includeDescription = false }: IProps) => {
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing } = useValidDirectListings(marketplace, {
    tokenContract: NFT_COLLECTION_ADDRESS,
    tokenId: nft.metadata.id,
  });

  const { data: auctionListing } = useValidEnglishAuctions(marketplace, {
    tokenContract: NFT_COLLECTION_ADDRESS,
    tokenId: nft.metadata.id,
  });

  const [currentPrice, setCurrentPrice] = useState<string | null>(null);

  // Keep the price in state so it doesn't keep hiding while loading
  useEffect(() => {
    if (directListing && directListing[0]) {
      setCurrentPrice(
        `${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`
      );
    } else if (auctionListing && auctionListing[0]) {
      setCurrentPrice(
        `${auctionListing[0]?.buyoutBidAmount} ${auctionListing[0]?.buyoutCurrencyValue}`
      );
    }
  }, [directListing]);

  return (
    <div className="rounded-b-lg bg-zinc-900 p-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-primary/90">
          {nft.metadata.name} #{nft.metadata.id}
        </h3>

        {includeDescription && (
          <p className="mt-2 text-sm font-bold text-gray-900 dark:text-primary">
            {nft.metadata.description}
          </p>
        )}

        <p className="mt-2 text-sm font-bold text-gray-900 dark:text-primary">
          {currentPrice || "Not listed"}
        </p>
      </div>
    </div>
  );
};

export default NFTMetadata;
