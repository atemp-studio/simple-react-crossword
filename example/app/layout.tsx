import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "simple-react-crossword",
  description: "Example showing basic use of simple-react-crossword",
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
