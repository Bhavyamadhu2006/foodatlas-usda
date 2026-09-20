import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "My Fitness & Diet",
  description: "Nutrition, recipes, USDA food lookup, portions, workouts and progress.",
  manifest: "/manifest.webmanifest",
  themeColor: "#0D1C11",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "My Fitness & Diet"
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
