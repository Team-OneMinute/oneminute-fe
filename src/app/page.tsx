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
import { useFirestore } from "./hooks/infrastructure/useFirestore";
import { useCustomEffect } from "./hooks/infrastructure/useCustomEffect";
import { WelcomeLoading } from "@/app/components/Organisms/WelcomeLoading";
import { Slider } from "@/app/components/Slider";
import { Header } from "@/app/components/Organisms/Header";
import styled from "styled-components";

export default function Home() {
  const { firebaseAuthConnect } = useAuthConnect();
  const { getEnv } = useEnv();
  const { goto } = usePageNavigate();
  const { startGame } = useGameStart();
  const { connected } = useTonConnect();
  const { getDocumentByDocNo } = useFirestore();
  const [initData, setInitData] = useState<string>("initialdata");
  const [isAuthConnected, setIsAuthConnected] = useState<boolean>(false);
  const [uid, setUid] = useState<string>("");
  const [isPlayableMain, setIsPlayableMain] = useState<boolean>(false);
  const [showWelcomeLoading, setShowWelcomeLoading] = useState<boolean>(true);

  useCustomEffect(() => {
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
          console.log("result", result);
          setUid(result);
          setIsAuthConnected(result != ""); // test on telegram display
        });
      }
    })();
  });

  useEffect(() => {
    if (isAuthConnected == true && uid != "") {
      // fetch user data
      (async () => {
        await getDocumentByDocNo("users", uid).then((userData) => {
          if (userData) {
            setIsPlayableMain(userData.life > 0);
          }
        });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthConnected]);

  useEffect(() => {
    // 7秒のタイマーを設定
    const timer = setTimeout(() => {
      if (isAuthConnected) {
        setShowWelcomeLoading(false);
      }
    }, 6500);

    // クリーンアップタイマー
    return () => clearTimeout(timer);
  }, [isAuthConnected]);

  return <>{showWelcomeLoading ? <WelcomeLoading /> : <Slider />}</>;
}
