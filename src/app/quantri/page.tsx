import { Suspense } from "react";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiderAdmin } from "@/components/Admin/components/SiderBar/SiderAdmin";


export default function RootAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                        <SiderAdmin />
                        {children}
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
