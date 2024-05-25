"use client";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { firebaseConfig } from "@/app/config/firebaseConfig";

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

// interface User {
//   displayName: string | null;
// }

export default function Login() {
  //const [user, setUser] = useState<User | null>(null);
  const [initData, setInitData] = useState<string>("initialString");

  useEffect(() => {
    // // URLからクエリパラメータを取得
    // const urlParams = new URLSearchParams(window.location.search);
    // const token = urlParams.get("token");

    // if (token) {
    //   // カスタムトークンを使用してFirebaseにログイン
    //   firebase
    //     .auth()
    //     .signInWithCustomToken(token)
    //     .then((userCredential) => {
    //       console.log("User logged in:", userCredential.user);
    //       setUser(userCredential.user as User);
    //     })
    //     .catch((error) => {
    //       console.error("Error signing in with custom token:", error);
    //     });
    // }
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      if (window.Telegram) {
        window.Telegram.WebApp.ready();
        const initData = window.Telegram.WebApp.initData;
        setInitData(initData);
        console.log(initData);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div>login page & init dat = {initData}</div>;
}
