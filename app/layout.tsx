import type { Metadata } from "next";
import "@/styles/globals.css";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { LenisProvider } from "@/lib/LenisProvider";
import FollowCursor from "@/components/Common/FollowCursor";
import Reload from "@/lib/Reload";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { HOME_INTRO_BOOT_SCRIPT } from "@/components/Main/homeIntroBoot";

const WEBSITE_HOST_URL = "https://youngfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_HOST_URL),
  title: "YOUNGFOLIO",
  description: "YOUNGFOLIO | Juyoung's Space",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "YOUNGFOLIO",
    description: "YOUNGFOLIO | Juyoung's Space",
    images: [
      "/images/project/thumbnail/img-project-thumbnail-youngfolio.png?v=1",
    ],
  },
  twitter: {
    title: "YOUNGFOLIO",
    description: "YOUNGFOLIO | Juyoung's Space",
    images: [
      "/images/project/thumbnail/img-project-thumbnail-youngfolio.png?v=1",
    ],
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <script
          id="youngfolio-home-intro"
          dangerouslySetInnerHTML={{ __html: HOME_INTRO_BOOT_SCRIPT }}
        />
        <LenisProvider>
          <Reload />
          <FollowCursor />
          <Header />
          {children}
          <Footer />
        </LenisProvider>

        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics
            googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
          />
        ) : null}
      </body>
    </html>
  );
}
