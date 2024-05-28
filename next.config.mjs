import * as dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // env: {
  //   REACT_APP_APIKEY: process.env.REACT_APP_APIKEY,
  //   REACT_APP_AUTHDOMAIN: process.env.REACT_APP_AUTHDOMAIN,
  //   REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
  //   REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
  //   REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
  //   REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
  //   REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID,
  // }
};

export default nextConfig;