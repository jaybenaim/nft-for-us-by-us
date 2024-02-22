import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [address]);

  if (!isLoggedIn) {
    return (
      <div className={"flex h-screen w-full items-center justify-center"}>
        <div>
          <h1 className={"text-lg"}>Please login to continue...</h1>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
