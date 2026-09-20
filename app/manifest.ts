import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My Fitness & Diet",
    short_name: "Fitness & Diet",
    description: "Nutrition, food portions, recipes, workouts and progress in one place.",
    start_url: "/",
    display: "standalone",
    background_color: "#08120B",
    theme_color: "#0D1C11",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
