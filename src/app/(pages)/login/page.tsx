"use client";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { firebaseConfig } from "@/app/config/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

interface User {
  displayName: string | null;
}

export default function Login() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // URLからクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // カスタムトークンを使用してFirebaseにログイン
      firebase
        .auth()
        .signInWithCustomToken(token)
        .then((userCredential) => {
          console.log("User logged in:", userCredential.user);
          setUser(userCredential.user as User);
        })
        .catch((error) => {
          console.error("Error signing in with custom token:", error);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Login with Telegram</h1>
      {!user ? (
        <div>
          <div
            className="telegram-login"
            data-telegram-login="@OneMInuteStgbot"
            data-size="large"
            data-auth-url="https://us-central1-oneminute-88837.cloudfunctions.net/telegramAuth"
            data-request-access="write"
          ></div>
          <script
            async
            src="https://telegram.org/js/telegram-widget.js?7"
          ></script>
        </div>
      ) : (
        <h1>Welcome, {user.displayName || "User"}!</h1>
      )}
    </div>
  );
}
