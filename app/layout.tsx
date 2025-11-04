import type { Metadata } from "next";
import "@/styles/globals.css";
import { useEffect } from "react";

import Header from "@/components/Layout/Header";
import { LenisProvider } from "@/lib/LenisProvider";
import FollowCursor from "@/components/Common/FollowCursor";
import Reload from "@/lib/Reload";

export const metadata: Metadata = {
  title: "YOUNGFOLIO",
  description: "YOUNGFOLIO | Juyoung's Space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="select-none">
        <LenisProvider>
          <Header />
          <Reload />
          {children}
          <FollowCursor />
        </LenisProvider>
      </body>
    </html>
  );
}
