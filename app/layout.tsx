import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Layout/Header";

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
