"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

interface Props {
  children: React.ReactNode;
}

const manifestUrl = "https://oneminute-88837.web.app/manifest.json";

const Provider: React.FC<Props> = ({ children }) => {
    return (
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        {children}
      </TonConnectUIProvider>
    );
}

export default Provider;
