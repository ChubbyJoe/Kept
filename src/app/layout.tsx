import { SerwistProvider } from "@serwist/next/react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Kept",
  title: "Kept",
  description: "A simple medication adherence tracker.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kept",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SerwistProvider swUrl="/sw.js">{children}</SerwistProvider>
      </body>
    </html>
  );
}
