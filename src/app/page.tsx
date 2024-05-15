"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { TonConnectButton } from '@tonconnect/ui-react';
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
        <Button variant="contained" sx={{ width: "45%" }}>
          main
        </Button>
      </Box>
      <Button variant="contained" sx={{ width: "20%" }}>
        user
      </Button>
      <TonConnectButton />
    </main>
  );
}
