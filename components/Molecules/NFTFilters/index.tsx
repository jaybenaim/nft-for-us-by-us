import Input from "@components/Atoms/Inputs/Input";
import { MARKETPLACE_ADDRESS } from "@constants/addresses";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DirectListingV3, NFT, useContract } from "@thirdweb-dev/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

interface IProps {
  data: NFT[];
  setFilteredData: (nfts: NFT[]) => void;
  setFiltersLoading: (bool: boolean) => void;
}

const subCategories = [];

const filters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
];

const NFTFilters = ({ data, setFilteredData, setFiltersLoading }: IProps) => {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [listingsWithPrices, setListingsWithPrices] = useState<
    DirectListingV3[] | null
  >(null);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const handleApplyFilter = async () => {
    if (!max) {
      return toast.error("Missing price targets");
    }
    setFiltersLoading(true);

    if (!listingsWithPrices) {
      await getListings();
      return handleApplyFilter();
    }

    const filteredListingIds = listingsWithPrices?.map((nft) =>
      +nft.currencyValuePerToken.displayValue >= min &&
      +nft.currencyValuePerToken.displayValue <= max
        ? nft.id
        : null
    );
    const filteredData = data.filter((nft) =>
      filteredListingIds.includes(nft.metadata.id)
    );

    setFilteredData(filteredData);
    console.log("set filter");
    setFiltersLoading(false);
  };

  const getListings = async () => {
    const listings = await marketplace.directListings.getAllValid();
    setListingsWithPrices(listings);
  };

  useEffect(() => {
    !loadingMarketplace && getListings();
  }, []);

  return (
    <div className=" bg-black">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-12 shadow-xl">
                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="w-full border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500 dark:text-primary/45">
                                <span className="font-medium text-gray-900 dark:text-primary">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-primary"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="lg:pb-24">
          {/* Filters */}
          <Disclosure as="div" className="border-t border-gray-200 py-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full items-center justify-between py-3">
                  <span className="font-bold text-gray-900 hover:text-primary/90 dark:text-primary">
                    Price
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>

                <Disclosure.Panel className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label=""
                      placeholder="Min"
                      id="min"
                      value={min}
                      type="number"
                      min={0}
                      step={1}
                      handleOnChange={(value: number) => setMin(value)}
                    />
                    <Input
                      label=""
                      placeholder="Max"
                      id="max"
                      value={max}
                      min={min}
                      max={100000000}
                      step={1}
                      type="number"
                      handleOnChange={(value: number) => setMax(value)}
                    />
                    <div className="col-span-2">
                      <button
                        className="mt-4 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-500 dark:text-white"
                        onClick={() => handleApplyFilter()}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
};

export default NFTFilters;
