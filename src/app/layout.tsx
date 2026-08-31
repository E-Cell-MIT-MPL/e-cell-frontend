import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import { UserProvider } from "@/components/user-provider";
import GlobalCRTWarpBackground from "@/components/GlobalCRTWarpBackground";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "E-Cell MIT | Entrepreneurship Cell, MIT Manipal",
  description:
    "E-Cell MIT Manipal fosters entrepreneurship by supporting startups, mentoring aspiring entrepreneurs, and building a strong entrepreneurial ecosystem. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${spaceGrotesk.variable} antialiased bg-[#121212] text-white selection:bg-white selection:text-black min-h-screen relative`}>
          <GlobalCRTWarpBackground />
          <div className="relative z-10">{children}</div>
        </body>
      </UserProvider>
    </html>
  );
}
