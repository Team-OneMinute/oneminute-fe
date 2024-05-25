"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { TonConnectButton } from '@tonconnect/ui-react';
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useOneMinuteContract } from "@/app/hooks/useOneMinuteContract";
import { useTonConnect } from "@/app/hooks/useTonConnect";
import { useFirestore } from "@/app/hooks/useFirestore";
import { useDateFormatter } from "@/app/hooks/useDateFormatter";
import WebApp from "@twa-dev/sdk";

export default function Home() {
  const router = useRouter();
  const { sendBet } = useOneMinuteContract();
  const { addDocument } = useFirestore();
  const { dateFormat } = useDateFormatter();
  const { connected, sender, isSent, transactionResponse } = useTonConnect();
  const initData = WebApp.initData;
  console.log("initData");
  console.log(initData);
  return (
    <main className={styles.main}>
      <Typography variant="h2" sx={{ color: "yellow" }}>
        OneMinute  {initData}
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
      <TonConnectButton />
    </main>
  );
}


