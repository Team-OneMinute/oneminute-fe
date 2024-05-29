import { loadEnvConfig } from "@next/env";

export const setupEnv = async (): Promise<void> => {
  loadEnvConfig(process.env.NEXT_PUBLIC_ENV || process.cwd());
};
