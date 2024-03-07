const NFTGrid = ({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found",
}: IProps) => {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
              key={nft.metadata.id}
            >
              <NFT nft={nft} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFT nft={nft} />
            </div>
          )
        )
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
};

export default NFTGrid;
