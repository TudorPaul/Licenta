import React from "react";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import "../style/prism.css";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import AuthProvider from "@/lib/providers/SessionProvider";
import { getServerSession } from "next-auth";

const baloo = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Licenta",
  description:
    "Licenta Ionel Tudor-Paul 2024 Profesor Coordonator George-Emil Vieriu",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={baloo.className}>
        <AuthProvider session={session}>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
