"use client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Provider as ReduxProvider } from "react-redux";
import { stores } from "./redux/store/stores";

interface Props {
  children: React.ReactNode;
}

const manifestUrl = "https://oneminute-88837.web.app/manifest.json";

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <ReduxProvider store={stores}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        {children}
      </TonConnectUIProvider>
    </ReduxProvider>
  );
}

export default Provider;
