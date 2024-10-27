import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/components/sessionsproviderwrapper";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Head, NextScript } from "next/document";

export const metadata: Metadata = {
  title: "safready",
  description: "A toolkit for techies to gear up for their tech careers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}