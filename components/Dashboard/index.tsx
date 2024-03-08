import NFTCard from "@components/Atoms/NFTCard";
import Skeleton from "@components/Atoms/Skeleton";
import Modal from "@components/Organisms/Modal";
import { NFT_COLLECTION_ADDRESS } from "@constants/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useLastViewedPhoto } from "utils/useLastViewedPhoto";

const Dashboard = () => {
  const router = useRouter();
  const { photoId } = router.query;

  const { contract: nftContract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(nftContract);

  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      {photoId && (
        <Modal
          images={data?.map((nft, index) => ({
            height: "100",
            width: "100",
            id: index,
            format: "",
            public_id: nft?.metadata?.id || "",
            blurDataUrl: "",
          }))}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )}

      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex h-full max-w-full items-center justify-center">
              <Image
                alt="Two overlapped faces"
                src="/face-outline.svg"
                layout="fill"
                objectFit="cover"
                priority
              />
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>

          <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
            What can you create?
          </h1>

          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            NFT's created by us, sold by us.
          </p>
        </div>

        {isLoading && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-8">
            <Skeleton />

            <Skeleton />
          </div>
        )}

        {data?.map((nft) => (
          <Link
            key={nft?.metadata?.id}
            href={`/?photoId=${nft?.metadata?.id}`}
            as={`/p/${nft?.metadata?.id}`}
            ref={
              nft?.metadata?.id === lastViewedPhoto ? lastViewedPhotoRef : null
            }
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <NFTCard key={nft.metadata.id} nft={nft} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
