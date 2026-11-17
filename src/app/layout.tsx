import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Compañía de Vinos | Vinos, Destilados, Cristalería y Regalos en Concordia",
    description:
        "Vinería y boutique de bebidas en San Luis 1220, Concordia. Gran variedad de vinos y cepas, whiskies, licores, cervezas importadas, cristalería, copas y regalería.",
    other: {
        "color-scheme": "light dark",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <LanguageProvider>
                    <Navbar />
                    <main
                        id="content"
                        tabIndex={-1}
                        className="relative min-h-screen w-full overflow-x-hidden bg-background focus:outline-none"
                    >
                        {children}
                    </main>
                    <Footer />
                </LanguageProvider>
                <Analytics />
            </body>
        </html>
    );
}
