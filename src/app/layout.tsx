"use client";

import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Home";
import { Footer } from "@/components/Home/components/Footer/Footer";
import { usePathname } from "next/navigation";
import { SiderAdmin } from "@/components/Admin/components/SiderBar/SiderAdmin";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/quantri");
  return (
    <html lang="en">
      <body
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <Suspense fallback={null}>
            {isAdminPage ? <SiderAdmin /> : <Header />}
            {children}
            {!isAdminPage && <Footer />}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
