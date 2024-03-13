import Input from "@components/Atoms/Inputs/Input";
import Textarea from "@components/Atoms/Inputs/TextArea";
import Upload from "@components/Atoms/Inputs/Upload";
import Spinner from "@components/Icons/Spinner";
import NFTCard from "@components/Molecules/NFTCard";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "@constants/addresses";
import {
  MediaRenderer,
  NFT,
  Web3Button,
  useContract,
  useResolvedMediaType,
} from "@thirdweb-dev/react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import CreateListingForm from "../CreateListingForm";

const storage = new ThirdwebStorage({
  clientId: process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID,
});

const SellNFTForm = () => {
  const router = useRouter();
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    "nft-collection"
  );

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nft, setNft] = useState<NFT | null>(null);
  const { url } = useResolvedMediaType(imageUri);

  const uploadImage = async (files: FileList) => {
    setLoading(true);

    const uri = await storage.upload(files[0]);

    if (uri) {
      await storage.download(uri);
      setImageUri(uri);
      setLoading(false);
    }
  };

  const formIsValid = () => {
    return [name, description].every((i) => i);
  };

  const createNFT = async () => {
    const minted = await nftCollection.erc721.mint({
      name,
      image: url,
      description,
    });

    const nft = await minted.data();

    setNft(nft);

    router.push("/mint#createDirectListing");
    // Todo alert
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
              <Textarea
                label="Description"
                id="description"
                handleOnChange={(value: string) => setDescription(value)}
                value={description}
              />
            </div>

            <div className="sm:col-span-3">
              {loading && <Spinner />}

              {url ? (
                <div>
                  <label
                    htmlFor="upload-preview"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Preview
                  </label>
                  <MediaRenderer src={url} />
                </div>
              ) : (
                <div className="sm:col-span-3">
                  <Upload
                    label="Upload your Image"
                    id="img-upload"
                    handleOnChange={(files) => uploadImage(files)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
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

      {nft && (
        <section
          id="#createDirectListing"
          className="space-y-12 rounded-lg bg-gray-300/10 p-8"
        >
          <div className="max-w-md">
            <NFTCard nft={nft} />
          </div>

          <CreateListingForm nft={nft} />
        </section>
      )}
    </div>
  );
};

export default SellNFTForm;
