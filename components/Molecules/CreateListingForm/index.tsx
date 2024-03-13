import Input from "@components/Atoms/Inputs/Input";
import Spinner from "@components/Icons/Spinner";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "@constants/addresses";
import {
  NATIVE_TOKEN_ADDRESS,
  NFT,
  Web3Button,
  useContract,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IProps {
  nft: NFT;
}

const CreateListingForm = ({ nft }: IProps) => {
  const router = useRouter();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const {
    mutateAsync: createDirectListing,
    isSuccess,
    isError,
  } = useCreateDirectListing(marketplace);

  const { contract: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    "nft-collection"
  );

  const [price, setPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formIsValid = () => {
    return [price, qty, startDate, endDate].every((i) => i);
  };

  const checkAndProvideApproval = async () => {
    const hasApproval = await nftCollection?.call("isApprovedForAll", [
      nft.owner as any,
      MARKETPLACE_ADDRESS as any,
    ]);

    if (hasApproval) console.log("Approval provided");

    if (!hasApproval) {
      const txResult = await nftCollection?.call("setApprovalForAll", [
        MARKETPLACE_ADDRESS as any,
        true as any,
      ]);

      if (txResult) {
        console.log("Approval provided");
      }
    }

    return true;
  };

  const handleCreateDirectListing = async () => {
    setIsLoading(true);
    try {
      await checkAndProvideApproval();

      createDirectListing({
        assetContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        pricePerToken: `${price}`,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        isReservedListing: false,
        quantity: `${qty}`,
        startTimestamp: new Date(startDate),
        endTimestamp: new Date(endDate),
      });
    } catch (err) {
      setIsLoading(false);
      toast.error("Failed to create direct listing");
      throw new Error("Error creating direct listing");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created direct listing");
      setIsLoading(false);
      router.push(`/view/${nft.metadata.id}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Direct listing failed");
      setIsLoading(false);
    }
  }, [isError]);

  return (
    <div>
      <div className="space-y-12 rounded-lg bg-gray-300/10 p-8">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Create a direct listing for {nft.metadata.name}
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white/60">
            Token ID # {nft.metadata.id}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Start Date"
                id="startDate"
                type="date"
                min={moment().format("YYYY-MM-DD")}
                max={moment().add(100, "years").format("YYYY-MM-DD")}
                handleOnChange={(value: string) => setStartDate(value)}
                value={startDate}
              />
            </div>

            <div className="sm:col-span-3">
              {" "}
              <Input
                label="End Date"
                id="endDate"
                type="date"
                min={moment().format("YYYY-MM-DD")}
                max={moment().add(100, "years").format("YYYY-MM-DD")}
                handleOnChange={(value: string) => setEndDate(value)}
                value={endDate}
              />
            </div>

            <div className="col-span-3">
              <Input
                label="Price (MATIC)"
                id="price"
                type="number"
                min={0}
                max={100000000}
                handleOnChange={(value: number) => setPrice(value)}
                value={price}
              />
            </div>

            <div className="col-span-3">
              <Input
                label="Qty"
                id="qty"
                type="number"
                min={0}
                max={100000}
                handleOnChange={(value: number) => setQty(value)}
                value={qty}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {isLoading && <Spinner />}
        <Web3Button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-500 dark:text-white"
          contractAddress={MARKETPLACE_ADDRESS}
          isDisabled={!formIsValid()}
          action={() => handleCreateDirectListing()}
        >
          Create Direct Listing
        </Web3Button>
      </div>
    </div>
  );
};

export default CreateListingForm;
