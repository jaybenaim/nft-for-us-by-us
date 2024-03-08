import Input from "@components/Atoms/Inputs/Input";
import Textarea from "@components/Atoms/Inputs/TextArea";
import Upload from "@components/Atoms/Inputs/Upload";
import NFTCard from "@components/Atoms/NFTCard";
import Spinner from "@components/Icons/Spinner";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "@constants/addresses";
import {
  MediaRenderer,
  NFT,
  Web3Button,
  useContract,
  useCreateDirectListing,
  useResolvedMediaType,
} from "@thirdweb-dev/react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

const storage = new ThirdwebStorage({
  clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID,
});

const SellNFTForm = () => {
  const router = useRouter();
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

  //   const { register: registerDirect, handleSubmit: handleSubmitDirect } =
  //     useForm<DirectFormData>({
  //       defaultValues: {
  //         nftContractAddress: NFT_COLLECTION_ADDRESS,
  //         tokenId: nft.metadata.id,
  //         price: "0",
  //         startDate: new Date(),
  //         endDate: new Date(),
  //       },
  //     });

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nft, setNft] = useState<NFT | null>(null);
  const { url } = useResolvedMediaType(imageUri);

  const uploadImage = async (files: FileList) => {
    setLoading(true);

    const uri = await storage.upload(files[0]);

    if (uri) {
      const result = await storage.download(uri);
      setImageUri(uri);
      setLoading(false);
    }
  };

  const formIsValid = () => {
    return [name, price, qty, description, tokenId, startDate, endDate].every(
      (i) => i
    );
  };

  const createNFT = async () => {
    const minted = await nftCollection.erc721.mint({
      name,
      image: url,
      description,
    });

    const nft = await minted.data();

    setNft(nft);

    router.push(`/view/${minted.id}`);
  };

  return (
    <div>
      <div className="space-y-12 rounded-lg bg-gray-300/10 p-8">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            NFT Metadata
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white/60">
            Add the details for your NFT.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                label="Title"
                id="name"
                handleOnChange={(value: string) => setName(value)}
                value={name}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                label="Token id"
                id="tokenId"
                handleOnChange={(value: string) => setTokenId(value)}
                value={tokenId}
              />
            </div>

            <div className="sm:col-span-full">
              <Textarea
                label="Description"
                id="description"
                handleOnChange={(value: string) => setDescription(value)}
                value={description}
              />
            </div>

            <div className="sm:col-span-2">
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

            <div className="sm:col-span-2">
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

            <div className="col-span-2 sm:col-start-1">
              <Input
                label="Price"
                id="price"
                type="number"
                min={0}
                max={100000}
                handleOnChange={(value: number) => setPrice(value)}
                value={price}
              />
            </div>

            <div className="col-span-2">
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

        {loading && <Spinner />}

        {url && <MediaRenderer src={url} />}

        <Upload
          label="Upload your Image"
          id="img-upload"
          handleOnChange={(files) => uploadImage(files)}
        />
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Cancel
        </button>

        <Web3Button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-500 dark:text-white"
          contractAddress={MARKETPLACE_ADDRESS}
          isDisabled={!formIsValid()}
          action={() => createNFT()}
        >
          Mint NFT
        </Web3Button>
      </div>

      {nft && <NFTCard nft={nft} />}
    </div>
  );
};

export default SellNFTForm;

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const storage = new ThirdwebStorage({
//     secretKey: process.env.NEXT_PUBLIC_THIRD_WEB_SECRET_KEY,
//   });

//   return {
//     props: {
//       storage,
//     },
//   };
// };
