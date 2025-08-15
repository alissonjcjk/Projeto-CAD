import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  // Remova a seção experimental ou atualize para propriedades válidas
  experimental: {
    // Mantenha apenas flags experimentais válidas para sua versão (15.3.3)
    // Exemplo de flags válidas (descomente apenas as que precisar):
    // serverActions: true,
    // optimizeCss: true,
  },
};

export default nextConfig;
