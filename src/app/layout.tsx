import type { Metadata } from "next";
import { Averia_Serif_Libre, Azeret_Mono } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${azeretMono.variable} ${averiaSerif.variable}`}>
      <body className="antialiased">
        {/* Provider global para gerenciar estado dos processos */}
        <ProcessProvider>{children}</ProcessProvider>
      </body>
    </html>
  );
}
