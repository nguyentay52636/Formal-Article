"use client";

import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Home";
import { Footer } from "@/components/Home/components/Footer/Footer";
import { usePathname } from "next/navigation";
import Chat from "@/components/Home/components/Chat/Chat";
import Logo from "@/components/Home/components/Categories/Logo";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/quantri");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <Suspense fallback={null}>
            {!isAdminPage && <Header />}
            {!isAdminPage && <Logo />}
            {children}
            <Chat />
            {!isAdminPage && <Footer />}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
