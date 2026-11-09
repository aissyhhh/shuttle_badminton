import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.gstatic.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "asset.kompas.com" },
      { protocol: "https", hostname: "golfellasindonesia.com" },
      { protocol: "https", hostname: "imgx.sonora.id" },
      { protocol: "https", hostname: "imgsrv2.voi.id"},
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/images/**"}
    ],
  },
};

export default nextConfig;