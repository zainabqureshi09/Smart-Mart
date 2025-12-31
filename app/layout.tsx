import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Mart",
  description: "Smart Mart - Premium E-commerce Marketplace",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
