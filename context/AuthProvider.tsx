"use client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [address]);

  useEffect(() => {
    // Constructing the URL with parameters
    const url = new URL("https://source.unsplash.com/random");

    url.searchParams.append("width", "1200");
    url.searchParams.append("height", "800");
    url.searchParams.append("orientation", "landscape");
    url.searchParams.append("topics", "artwork");

    // Fetch a random image from Unsplash Source API with specified parameters
    axios
      .get(url.toString())
      .then((response) => {
        setBackgroundImage(response.request.responseURL);
      })
      .catch((error) => {
        console.error("Error fetching background image:", error);
      });
  }, []);

  if (!isLoggedIn) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
          <ConnectWallet className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
