import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Behired",
    short_name: "Behired",
    description: "Organize e acompanhe seus processos seletivos.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f4ef",
    theme_color: "#3a5a40",
    lang: "pt-BR",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
