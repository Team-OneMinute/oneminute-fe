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

export default function Home() {
  const router = useRouter();
  const { sendBet } = useOneMinuteContract();
  const { addDocument } = useFirestore();
  const { dateFormat } = useDateFormatter();
  const { connected, sender, isSent, transactionResponse } = useTonConnect();

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
            onClick={() => {
              sendBet();
              if (isSent) {
                const transactionCollectionName = "0001_transaction";
                const transactionDocumentData = {
                  wallet_address: sender.address?.toString(),
                  created_at: dateFormat(new Date()),
                };
                console.log(transactionResponse);
                addDocument(transactionCollectionName, transactionDocumentData);
              }
            }}
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
