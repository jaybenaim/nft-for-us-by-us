import MintNFTForm from "@components/Molecules/MintNFTForm";
import { NextPage } from "next";

const MintPage: NextPage = () => {
  return (
    <div className="p-4 lg:p-16">
      <MintNFTForm />
    </div>
  );
};

export default MintPage;
