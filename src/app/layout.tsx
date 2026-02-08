import type { Metadata } from "next";
import { Averia_Serif_Libre, Azeret_Mono } from "next/font/google";
import "./globals.css";

const azeretMono = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en">
      <body
        className={`${azeretMono.variable} ${averiaSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
