import type { Metadata } from "next";
import "@/styles/globals.css";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { LenisProvider } from "@/lib/LenisProvider";
import FollowCursor from "@/components/Common/FollowCursor";
import Reload from "@/lib/Reload";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "YOUNGFOLIO",
    description: "YOUNGFOLIO | Juyoung's Space",
    icons: {
      icon: "/images/favicon.ico",
    },
    openGraph: {
      title: "YOUNGFOLIO",
      description: "YOUNGFOLIO | Juyoung's Space",
      images: ["/images/img-project-thumbnail-youngfolio.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <LenisProvider>
          <Reload />
          <FollowCursor />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
