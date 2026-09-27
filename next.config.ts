import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [{type: "host", value: "juwa3x.vercel.app"}],
        destination: "https://www.juwa3x.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{type: "host", value: "juwa3x.vercel.app"}],
        destination: "https://www.juwa3x.com/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
