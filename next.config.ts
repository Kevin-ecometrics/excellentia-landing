import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Necesario porque hay dos root layouts (en / es): sin esto el 404 se
    // genera sin contenido. Ver app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
