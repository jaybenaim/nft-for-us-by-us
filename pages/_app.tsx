import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "@styles/index.css";
import type { AppType } from "next/dist/shared/lib/utils";
import AuthProvider from "@context/AuthProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider
      activeChain={ChainId.Mumbai}
      clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThirdwebProvider>
  );
};

export default MyApp;
