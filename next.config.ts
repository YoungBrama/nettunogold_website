import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Il pannello contenuti (Decap CMS) vive come pagina statica in
  // public/admin/index.html. Next serve i file di /public solo al loro
  // percorso esatto, quindi /admin e /admin/ vanno riscritti lì (il
  // percorso di config.yml è indicato esplicitamente nell'HTML stesso,
  // vedi il tag <link rel="cms-config-url"> in public/admin/index.html,
  // così funziona sia con sia senza slash finale, senza bisogno di
  // redirect che andrebbero in loop con la normalizzazione di Next).
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
      { source: "/admin/", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
