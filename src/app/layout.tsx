
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Correct import for App Router
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";

// Configure Inter font
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Compañía de Vinos | Concordia",
    description: "Vinería Premium en Concordia, Entre Ríos. El arte de brindar.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className={inter.className}>
                <LanguageProvider>
                    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
                        <Navbar />
                        {children}
                    </main>
                </LanguageProvider>
            </body>
        </html>
    );
}
