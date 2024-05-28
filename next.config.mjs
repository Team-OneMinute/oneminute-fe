import * as dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    REACT_APP_FIREBASE_APIKEY: process.env.REACT_APP_FIREBASE_APIKEY,
    REACT_APP_FIREBASE_DOMAIN: process.env.REACT_APP_FIREBASE_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET:
      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_SENDER_ID: process.env.REACT_APP_FIREBASE_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
    REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID,
  },
};

export default nextConfig;