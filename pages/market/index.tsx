import Input from "@components/Atoms/Inputs/Input";
import Skeleton from "@components/Atoms/Skeleton";
import NFTFilters from "@components/Molecules/NFTFilters";
import NFTGrid from "@components/Molecules/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "@constants/addresses";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NFT, useContract, useNFTs } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Buy: NextPage = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);
  const [filteredData, setFilteredData] = useState<NFT[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);

    const filteredData = data.filter(
      (nft) =>
        nft.metadata.description.toLowerCase().includes(searchValue) ||
        (typeof nft.metadata.name === "string" &&
          nft.metadata.name.toLowerCase().includes(searchValue))
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    if (!filteredData && data) {
      setFilteredData(data);
    }
  }, [filteredData, data]);

  return (
    <div className="px-8 py-8 lg:px-16">
      <h1 className="text-lg font-bold text-white">Buy NFTs</h1>
      <p>Browse and buy NFTs from this collection.</p>

      <div className="grid w-full grid-cols-5 gap-4 lg:h-[600px]">
        <div className="col-span-full flex flex-col justify-between pt-4 lg:col-span-1">
          <div className="space-y-4">
            <Input
              icon={MagnifyingGlassIcon}
              label=""
              placeholder="Search by name"
              id="search"
              value={searchTerm}
              type="search"
              handleOnChange={handleSearch}
            />

            <NFTFilters
              data={data}
              setFilteredData={setFilteredData}
              setFiltersLoading={setFiltersLoading}
            />
          </div>

          {filteredData !== data && (
            <button
              className="mt-4 w-1/2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-500 dark:text-white"
              onClick={() => setFilteredData(data)}
            >
              Reset
            </button>
          )}
        </div>

        <div className="col-span-full max-h-screen overflow-scroll lg:col-span-4">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
            {(isLoading || filtersLoading) && (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}

            {!filtersLoading && (
              <NFTGrid
                isLoading={isLoading}
                data={filteredData}
                emptyText={"No NFTs found"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
