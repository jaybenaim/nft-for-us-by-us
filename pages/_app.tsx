import Layout from "@components/Layout";
import AuthProvider from "@context/AuthProvider";
import "@styles/index.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider
      activeChain={ChainId.Mumbai}
      clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
      secretKey={process.env.NEXT_PUBLIC_THIRD_WEB_SECRET_KEY}
    >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThirdwebProvider>
  );
};

export default MyApp;
