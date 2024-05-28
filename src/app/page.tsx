"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useOneMinuteContract } from "@/app/hooks/useOneMinuteContract";
import { useTonConnect } from "@/app/hooks/useTonConnect";
import { useFirestore } from "@/app/hooks/useFirestore";
import { useDateFormatter } from "@/app/hooks/useDateFormatter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { configInterface, useAuthConnect } from "@/app/hooks/useAuthConnect";

export default function Home() {
  const router = useRouter();
  const { sendBet } = useOneMinuteContract();
  const { addDocument } = useFirestore();
  const { dateFormat } = useDateFormatter();
  const { firebaseAuthConnect } = useAuthConnect();
  const { connected, sender, isSent, transactionResponse } = useTonConnect();
  const [initData, setInitData] = useState<string>("initialdata");
  const [customToken, setCustomToken] = useState<string>("init");
  const [userData, setUserData] = useState<string>("init");
  const [envConfig, setEnvConfig] = useState<configInterface>();
  const [isAuthConnected, setIsAuthConnected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined" && isAuthConnected == false) {
        const initDataFromTelegram = WebApp.initData;
      // if (isAuthConnected == false) {
      //   const initDataFromTelegram =
      //     "query_id=AAEw7NkaAwAAADDs2Rq3VOfw&user=%7B%22id%22%3A6892940336%2C%22first_name%22%3A%22Atsushi%22%2C%22last_name%22%3A%22Iwakiri%22%2C%22username%22%3A%22takeumanorekishi%22%2C%22language_code%22%3A%22ja%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1716881860&hash=8de916426cd095d4cf1c4bdaaca39e9dd96c6757492f86cf4a99167ca43ae84d";
        setInitData(
          initDataFromTelegram != "" ? initDataFromTelegram : "blankData"
        );
        await firebaseAuthConnect(
          initDataFromTelegram,
          setCustomToken,
          setUserData,
          setEnvConfig
        ).then((result) => {
          setIsAuthConnected(result);
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
          onClick={() => router.push("/game")}
        >
          Free
        </Button>
        {connected && (
          <Button
            variant="contained"
            sx={{ width: "45%" }}
            onClick={() => router.push("/game")}
          >
            main
          </Button>
        )}
      </Box>
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={() => router.push("/login")}
      >
        telegram login
      </Button>
      <text color="white">{initData}</text>
      <text color="white">customToken: {customToken}</text>
      <text color="white">isAuthConnected: {String(isAuthConnected)}</text>
      <text color="white">userData: {userData}</text>
      <text color="white">
        apiKey: {envConfig?.apiKey}, authDomain: {envConfig?.authDomain},
        projectId: {envConfig?.projectId}, storageBucket:{" "}
        {envConfig?.storageBucket}, messagingSenderId:{" "}
        {envConfig?.messagingSenderId}, appId: {envConfig?.appId},
        measurementId: {envConfig?.measurementId}
      </text>
      <TonConnectButton />
    </main>
  );
}
