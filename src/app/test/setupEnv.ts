import { loadEnvConfig } from "@next/env";

export const setupEnv = async (): Promise<void> => {
    loadEnvConfig(process.env.NEXT_PUBLIC_FIREBASE_APIKEY || process.cwd());
    loadEnvConfig(process.env.NEXT_PUBLIC_FIREBASE_DOMAIN || process.cwd());
    loadEnvConfig(process.env.NEXT_PUBLIC_FIREBASE_DATABASE || process.cwd());
    loadEnvConfig(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.cwd());
    loadEnvConfig(
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.cwd()
    );
    loadEnvConfig(process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID || process.cwd());
    loadEnvConfig(process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.cwd());
    loadEnvConfig(process.env.NEXT_PUBLIC_MEASUREMENT_ID || process.cwd());
    loadEnvConfig(process.env.NEXT_PUBLIC_ENV || process.cwd());
    loadEnvConfig(process.env.NEXT_PUBLIC_BE_URL || process.cwd());
};
