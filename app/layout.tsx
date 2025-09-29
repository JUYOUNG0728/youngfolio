import type { Metadata } from "next";
import "@/styles/globals.css";

import Header from "@/components/Layout/Header";
import { LenisProvider } from "@/utils/LenisProvider";

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
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
