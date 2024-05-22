"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { TonConnectButton } from '@tonconnect/ui-react';
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useOneMinuteContract } from "@/app/hooks/useOneMinuteContract";
import { useTonConnect } from "@/app/hooks/useTonConnect";

export default function Home() {
  const router = useRouter();
  const { sendBet } = useOneMinuteContract();
    const { connected } = useTonConnect();
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
            onClick={() => sendBet()}
          >
            main
          </Button>
        )}
      </Box>
      <Button variant="contained" sx={{ width: "20%" }}>
        user
      </Button>
      <TonConnectButton />
    </main>
  );
}
