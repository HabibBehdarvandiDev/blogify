import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // allow any https host
            },
            {
                protocol: "http",
                hostname: "**", // allow any http host
            },
        ],
    },
};

export default nextConfig;
