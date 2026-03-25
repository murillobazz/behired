import type { Metadata, Viewport } from "next";
import { Averia_Serif_Libre, Azeret_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { PwaRegister } from "@/components/PwaRegister";
import { ProcessProvider } from "@/contexts/ProcessContext";

const azeretMono = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
});

const averiaSerif = Averia_Serif_Libre({
  variable: "--font-averia",
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Behired - Organize seus processos seletivos",
  description: "Acompanhe seus processos seletivos de forma organizada e visual",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Behired",
  },
  icons: {
    icon: [{ url: "/icon" }],
    apple: [{ url: "/apple-icon" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3a5a40",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${azeretMono.variable} ${averiaSerif.variable}`}>
      <body>
        <PwaRegister />
        {/* Provider global para gerenciar estado dos processos */}
        <ProcessProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ProcessProvider>
      </body>
    </html>
  );
}
