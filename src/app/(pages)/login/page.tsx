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
  const [isExpanded, setIsExpanded] = useState<boolean>();

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
    const scriptSrc = "https://telegram.org/js/telegram-web-app.js";
    // スクリプトがすでに存在するかどうかを確認
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;

      const head = document.head;
      const firstScript = head.querySelector('script');

      if (firstScript) {
        head.insertBefore(script, firstScript);
      } else {
        head.appendChild(script);
      }
    

      script.onload = () => {
        if (window.Telegram) {
          window.Telegram.WebApp.ready();
          console.log("start onload");
          const initData = window.Telegram.WebApp.initData;
          const initWebApp = window.Telegram.WebApp;
          setInitData(initData);
          setIsExpanded(initWebApp.isExpanded);
          console.log("imit dat");
          console.log(initData);
          console.log("init web app");
          console.log(initWebApp);
        }
      };
    }
  }, []);

  return (
    <div>
      login page & init dat = {initData}, & isExpanded = {isExpanded}
    </div>
  );
}
