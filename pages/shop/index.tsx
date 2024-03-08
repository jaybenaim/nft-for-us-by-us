import NFTGrid from "@components/Molecules/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "@constants/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";

const Buy = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <div className="px-16 py-8">
      <h1 className="text-white">Buy NFTs</h1>
      <p>Browse and buy NFTs from this collection.</p>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <NFTGrid
          isLoading={isLoading}
          data={data}
          emptyText={"No NFTs found"}
        />
      </div>
    </div>
  );
};

export default Buy;
