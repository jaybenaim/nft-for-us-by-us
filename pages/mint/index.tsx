import SellNFTForm from "@components/Molecules/MintNFTForm";
import { NextPage } from "next";

const Sell: NextPage = () => {
  return (
    <div className="p-16">
      <SellNFTForm />
    </div>
  );
};

export default Sell;
