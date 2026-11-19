import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo afecta `next dev`: permite probar desde otros dispositivos de la red local.
  // Sin esto Next bloquea su JS de desarrollo y la pagina carga sin animaciones.
  allowedDevOrigins: ["192.168.0.162"],
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Necesario porque hay dos root layouts (en / es): sin esto el 404 se
    // genera sin contenido. Ver app/global-not-found.tsx.
    globalNotFound: true,
    agentUpgrade: "security",
  },
};

export default nextConfig;
