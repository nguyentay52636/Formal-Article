"use client";

import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import { Header } from "@/components/Home";
import { Footer } from "@/components/Home/components/Footer/Footer";
import { usePathname } from "next/navigation";
import Logo from "@/components/Home/components/Categories/Logo";
import Chat from "@/components/Home/components/Chat/Chat";
import ReduxProvider from "@/components/Provider/ReduxProvider";
import { Toaster } from "react-hot-toast";


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
          <ReduxProvider>
            <Suspense fallback={null}>
              {!isAdminPage && <Header />}
              {!isAdminPage && <Logo />}
              {children}
              <Chat />
              {!isAdminPage && <Footer />}
            </Suspense>
          </ReduxProvider>
          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}
