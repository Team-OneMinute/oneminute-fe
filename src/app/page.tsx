"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { TonConnectButton } from '@tonconnect/ui-react';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        Hello World!!!
        <TonConnectButton />
      </div>
    </main>
  );
}
