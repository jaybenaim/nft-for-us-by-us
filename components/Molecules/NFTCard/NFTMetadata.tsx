import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "@constants/addresses";
import {
  NFT,
  useAddress,
  useContract,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

interface IProps {
  nft: NFT;
  includeDescription?: boolean;
}

const NFTMetadata = ({ nft, includeDescription = false }: IProps) => {
  const address = useAddress();

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing } = useValidDirectListings(marketplace, {
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
    }
  }, [directListing]);

  const isOwner = nft?.owner === address;

  return (
    <div className="h-28 rounded-b-lg bg-zinc-900 p-4">
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-primary/90">
          {nft.metadata.name} #{nft.metadata.id}
        </h3>

        {includeDescription && (
          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-primary">
            {nft.metadata.description}
          </p>
        )}

        {currentPrice && (
          <p className="mt-2 text-sm font-bold text-gray-900 dark:text-primary">
            {currentPrice}
          </p>
        )}

        {isOwner && (
          <p className="mt-2 text-sm font-bold text-gray-900 dark:text-primary">
            Owned
          </p>
        )}
      </div>
    </div>
  );
};

export default NFTMetadata;
