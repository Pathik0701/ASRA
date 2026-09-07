import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASRA | Support · Guide · Empower",
  description:
    "A digital household support system for migration-affected families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}