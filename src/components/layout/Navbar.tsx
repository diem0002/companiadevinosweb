
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FlagARG, FlagBRA } from "../icons/flags";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Logo fallback
    const logoSrc = "/lib/logo.png";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = (lang: "es" | "pt") => {
        setLanguage(lang);
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 transition-all duration-500",
                scrolled ? "scale-[0.98]" : ""
            )}
        >
            <div
                className={cn(
                    "container mx-auto flex items-center justify-between rounded-[2rem] px-6 py-3 transition-all duration-500",
                    scrolled ? "glass shadow-2xl border border-white/20 bg-white/80 backdrop-blur-xl" : "bg-transparent border border-transparent"
                )}
            >

                {/* Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className={cn(
                        "relative overflow-hidden rounded-full bg-white shadow-sm border border-black/5 transition-all duration-300 flex items-center justify-center",
                        scrolled ? "h-10 w-10" : "h-12 w-12"
                    )}>
                        <img
                            src={logoSrc}
                            alt="Compañía de Vinos"
                            className="h-full w-full object-cover p-1 rounded-full"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn("font-black tracking-tighter text-primary leading-none uppercase transition-all", scrolled ? "text-sm" : "text-base")}>
                            Compañía de Vinos
                        </span>
                        <span className="text-[0.6rem] font-bold tracking-widest text-accent uppercase leading-none mt-0.5">
                            Concordia
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link href="#story" className="text-xs font-black uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors">
                        {t("nav.history")}
                    </Link>
                    <Link href="#prices" className="text-xs font-black uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors">
                        {t("nav.prices")}
                    </Link>
                    <Link href="#location" className="text-xs font-black uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors">
                        {t("nav.location")}
                    </Link>

                    {/* Divider */}
                    <div className="h-4 w-[1px] bg-foreground/10" />

                    {/* Language with Flags */}
                    <div className="flex gap-2 bg-secondary/50 rounded-full p-1 border border-white/20">
                        <button
                            onClick={() => toggleLanguage("es")}
                            className={cn(
                                "h-6 w-8 rounded-full flex items-center justify-center transition-all overflow-hidden border",
                                language === "es" ? "border-primary opacity-100 shadow-md scale-110 grayscale-0" : "border-transparent opacity-50 grayscale hover:grayscale-0 hover:opacity-100"
                            )}
                            title="Español"
                        >
                            <FlagARG className="h-full w-full object-cover" />
                        </button>
                        <button
                            onClick={() => toggleLanguage("pt")}
                            className={cn(
                                "h-6 w-8 rounded-full flex items-center justify-center transition-all overflow-hidden border",
                                language === "pt" ? "border-primary opacity-100 shadow-md scale-110 grayscale-0" : "border-transparent opacity-50 grayscale hover:grayscale-0 hover:opacity-100"
                            )}
                            title="Português"
                        >
                            <FlagBRA className="h-full w-full object-cover" />
                        </button>
                    </div>

                    {/* WhatsApp Button */}
                    <a
                        href="https://wa.me/5493454128571"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-9 rounded-full bg-primary text-[0.7rem] font-black tracking-widest px-6 text-white hover:bg-primary/90 shadow-lg shadow-primary/20 animate-pulse-slow transition-colors"
                    >
                        WHATSAPP
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <div className="flex gap-2">
                        <button onClick={() => toggleLanguage("es")} className={cn("h-6 w-6 rounded-full overflow-hidden border", language === "es" ? "border-primary shadow-sm grayscale-0" : "border-transparent grayscale opacity-60")}>
                            <FlagARG className="h-full w-full object-cover" />
                        </button>
                        <button onClick={() => toggleLanguage("pt")} className={cn("h-6 w-6 rounded-full overflow-hidden border", language === "pt" ? "border-primary shadow-sm grayscale-0" : "border-transparent grayscale opacity-60")}>
                            <FlagBRA className="h-full w-full object-cover" />
                        </button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary hover:bg-primary/10 rounded-full">
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="animate-in fade-in zoom-in slide-in-from-top-4 duration-500 glass mt-4 mx-4 flex flex-col gap-6 rounded-[2rem] p-8 md:hidden shadow-2xl border border-white/20 relative z-50">
                    <Link
                        href="#story"
                        className="text-center text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t("nav.history")}
                    </Link>
                    <Link
                        href="#prices"
                        className="text-center text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t("nav.prices")}
                    </Link>
                    <Link
                        href="#location"
                        className="text-center text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t("nav.location")}
                    </Link>

                    <a
                        href="https://wa.me/5493454128571"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full h-10 rounded-full bg-primary font-black tracking-widest text-white hover:bg-primary/90 transition-colors"
                    >
                        WHATSAPP
                    </a>
                </div>
            )}
        </nav>
    );
}
