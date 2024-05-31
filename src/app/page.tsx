"use client";
import styles from "./page.module.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Box, Button, Typography } from "@mui/material";
import { useTonConnect } from "@/app/hooks/service/useTonConnect";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useAuthConnect } from "@/app/hooks/service/useAuthConnect";
import { useEnv } from "./hooks/util/useEnv";
import { initDataMock } from "@/app/mock/telegramInitData";
import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { useGameStart } from "@/app/hooks/service/useGameStart";
import { useUserInitialize } from "@/app/hooks/service/useUserInitialize";

export default function Home() {
  const { firebaseAuthConnect } = useAuthConnect();
  const { userInitialize } = useUserInitialize();
  const { getEnv } = useEnv();
  const { goto } = usePageNavigate();
  const { startGame } = useGameStart();
  const { connected } = useTonConnect();
  const [initData, setInitData] = useState<string>("initialdata");
  const [isAuthConnected, setIsAuthConnected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined" && isAuthConnected == false) {
        let initDataFromTelegram = WebApp.initData;
        console.log("env");
        console.log(getEnv());
        if (getEnv() == "dev") {
          initDataFromTelegram = initDataMock[9];
        }
        setInitData(
          initDataFromTelegram != "" ? initDataFromTelegram : "blankData"
        );
        await firebaseAuthConnect(initDataFromTelegram).then(async (result) => {
          setIsAuthConnected(result != "");
          await userInitialize(result);
        });
      }
    })();
  }, []);

  return (
    <main className={styles.main}>
      <Typography variant="h2" sx={{ color: "yellow" }}>
        OneMinute
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "45%" }}
          onClick={() => goto("game")}
        >
          Free
        </Button>
        {connected && (
          <Button
            variant="contained"
            sx={{ width: "45%" }}
            onClick={() => startGame()}
          >
            main
          </Button>
        )}
      </Box>
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={() => goto("login")}
      >
        telegram login
      </Button>
      <text color="white">{initData}</text>
      <text color="white">isAuthConnected: {String(isAuthConnected)}</text>
      <TonConnectButton />
    </main>
  );
}
