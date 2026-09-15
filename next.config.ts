import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Il pannello contenuti (Decap CMS) vive come pagina statica in
  // public/admin/index.html. Next serve i file di /public solo al loro
  // percorso esatto, quindi /admin e /admin/ vanno reindirizzati lì.
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
      { source: "/admin/", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
