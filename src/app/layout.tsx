import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthCheck } from "@/components/auth-check";
import Head from "next/head";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To do app",
  description: "To do app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/joypixels@6.6.0/css/joypixels.min.css"
        />
      </Head>
      <body className={`${roboto.variable} antialiased`}>
        <AuthCheck>{children}</AuthCheck>
      </body>
    </html>
  );
}
