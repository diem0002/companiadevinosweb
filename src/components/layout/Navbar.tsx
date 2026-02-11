
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Menu, Wine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Logo fallback in case file is missing
    const logoSrc = "/lib/logo.png";

    const toggleLanguage = () => {
        setLanguage(language === "es" ? "pt" : "es");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="glass flex items-center justify-between rounded-[2rem] px-6 py-3">
                    {/* Brand / Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-white">
                            {/* 
                 For a real project we would check if image exists or use a component 
                 that handles fallback. For now, we assume logo.png is there as requested.
                 If not, we show an icon.
               */}
                            <img
                                src={logoSrc}
                                alt="Compañía de Vinos"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                }}
                            />
                            <Wine className="absolute hidden h-6 w-6 text-primary" />
                        </div>
                        <span className="hidden text-lg font-bold tracking-tight text-primary md:block">
                            Compañía de Vinos
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-8 md:flex">
                        <Link href="#story" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                            {t("nav.history")}
                        </Link>
                        <Link href="#prices" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                            {t("nav.prices")}
                        </Link>
                        <Link href="#location" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                            {t("nav.location")}
                        </Link>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleLanguage}
                            className="w-12 font-bold text-primary"
                        >
                            {language.toUpperCase()}
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleLanguage}
                            className="font-bold text-primary"
                        >
                            {language.toUpperCase()}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="h-6 w-6 text-primary" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="glass mt-2 flex flex-col gap-4 rounded-[2rem] p-6 md:hidden">
                        <Link
                            href="#story"
                            className="text-center font-medium text-foreground/80 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.history")}
                        </Link>
                        <Link
                            href="#prices"
                            className="text-center font-medium text-foreground/80 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.prices")}
                        </Link>
                        <Link
                            href="#location"
                            className="text-center font-medium text-foreground/80 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("nav.location")}
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
