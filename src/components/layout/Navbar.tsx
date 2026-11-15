"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { FlagARG, FlagBRA } from "../icons/flags";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const popoverId = useId();
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [scrolledFallback, setScrolledFallback] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const logoSrc = "/lib/logo.png";

    useEffect(() => {
        // Fallback only for browsers that don't support CSS scroll-driven animations (shrinking-header-on-scroll guide)
        if (
            typeof CSS !== "undefined" &&
            !CSS.supports("(animation-timeline: scroll()) and (animation-range: 0% 100%)")
        ) {
            const handleScroll = () => {
                setScrolledFallback(window.scrollY > 24);
            };
            handleScroll();
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        const popoverEl = popoverRef.current;
        if (!popoverEl) return;

        const handleToggle = (event: Event) => {
            const toggleEvent = event as ToggleEvent;
            setIsPopoverOpen(toggleEvent.newState === "open");
        };

        popoverEl.addEventListener("toggle", handleToggle);
        return () => popoverEl.removeEventListener("toggle", handleToggle);
    }, []);

    const closeMobileMenu = () => {
        const popoverEl = popoverRef.current as (HTMLDivElement & { hidePopover?: () => void }) | null;
        if (popoverEl && typeof popoverEl.hidePopover === "function") {
            try {
                popoverEl.hidePopover();
            } catch {
                // Ignore if already closed
            }
        }
        setIsPopoverOpen(false);
        triggerRef.current?.focus();
    };

    const handleTriggerClick = () => {
        // Fallback if Invoker Commands API (commandfor) is not natively supported
        if (
            typeof HTMLButtonElement !== "undefined" &&
            !("commandForElement" in HTMLButtonElement.prototype)
        ) {
            const popoverEl = popoverRef.current as (HTMLDivElement & { togglePopover?: () => void }) | null;
            if (popoverEl && typeof popoverEl.togglePopover === "function") {
                popoverEl.togglePopover();
            } else {
                setIsPopoverOpen((prev) => !prev);
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-2 md:px-8 scroll-header-shell">
            {/* Accessible Skip Link (accessibility guide) */}
            <a
                href="#content"
                className="visually-hidden focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:text-xs focus:font-black focus:tracking-widest focus:text-white focus:shadow-xl"
            >
                {t("a11y.skip")}
            </a>

            <nav
                aria-label={t("a11y.nav.primary")}
                className={cn(
                    "container mx-auto flex items-center justify-between rounded-[2rem] px-5 py-2 md:px-7 md:py-2.5 border border-primary/10 backdrop-blur-xl transition-colors duration-300 scroll-header-bar",
                    scrolledFallback
                        ? "bg-card/95 shadow-2xl"
                        : "bg-card/85 shadow-lg shadow-primary/5"
                )}
            >
                {/* Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary shadow-md border-2 border-white/80 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center shrink-0">
                        <img
                            src={logoSrc}
                            alt="Logo de Compañía de Vinos"
                            width={40}
                            height={40}
                            className="h-full w-full object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black tracking-tight text-primary leading-none uppercase text-sm md:text-base">
                            Compañía de Vinos
                        </span>
                        <span className="text-[0.65rem] font-bold tracking-[0.22em] text-accent uppercase leading-none mt-1">
                            Concordia
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden items-center gap-7 lg:flex">
                    <Link
                        href="#features"
                        className="text-xs font-black uppercase tracking-[0.14em] text-foreground/85 hover:text-primary transition-colors"
                    >
                        {t("nav.categories")}
                    </Link>
                    <Link
                        href="#story"
                        className="text-xs font-black uppercase tracking-[0.14em] text-foreground/85 hover:text-primary transition-colors"
                    >
                        {t("nav.history")}
                    </Link>
                    <Link
                        href="#local"
                        className="text-xs font-black uppercase tracking-[0.14em] text-foreground/85 hover:text-primary transition-colors"
                    >
                        {t("nav.gallery")}
                    </Link>
                    <Link
                        href="#location"
                        className="text-xs font-black uppercase tracking-[0.14em] text-foreground/85 hover:text-primary transition-colors"
                    >
                        {t("nav.location")}
                    </Link>

                    <div className="h-4 w-[1px] bg-primary/15" aria-hidden="true" />

                    {/* Language Switcher with accessible names and aria-pressed (accessibility guide) */}
                    <div
                        role="group"
                        aria-label="Selector de idioma"
                        className="flex gap-1.5 bg-secondary/80 rounded-full p-1 border border-primary/10"
                    >
                        <button
                            type="button"
                            onClick={() => setLanguage("es")}
                            aria-label={t("a11y.lang.es")}
                            aria-pressed={language === "es"}
                            className={cn(
                                "h-6 w-8 rounded-full flex items-center justify-center transition-transform overflow-hidden border",
                                language === "es"
                                    ? "border-primary opacity-100 shadow-sm scale-105 grayscale-0"
                                    : "border-transparent opacity-55 grayscale hover:grayscale-0 hover:opacity-100"
                            )}
                        >
                            <FlagARG aria-hidden="true" className="h-full w-full object-cover" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setLanguage("pt")}
                            aria-label={t("a11y.lang.pt")}
                            aria-pressed={language === "pt"}
                            className={cn(
                                "h-6 w-8 rounded-full flex items-center justify-center transition-transform overflow-hidden border",
                                language === "pt"
                                    ? "border-primary opacity-100 shadow-sm scale-105 grayscale-0"
                                    : "border-transparent opacity-55 grayscale hover:grayscale-0 hover:opacity-100"
                            )}
                        >
                            <FlagBRA aria-hidden="true" className="h-full w-full object-cover" />
                        </button>
                    </div>

                    {/* Direct WhatsApp CTA */}
                    <ObfuscatedContact
                        value="5493454128571"
                        type="phone"
                        text={t("nav.whatsapp")}
                        message={t("ready.whatsapp.message")}
                        className="inline-flex items-center justify-center gap-2 h-9 rounded-full bg-primary text-[0.72rem] font-black tracking-widest px-5 text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] hover:text-white"
                    >
                        <MessageCircle aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                    </ObfuscatedContact>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-3 lg:hidden">
                    <div
                        role="group"
                        aria-label="Selector de idioma"
                        className="flex gap-1.5 bg-secondary/80 rounded-full p-1 border border-primary/10"
                    >
                        <button
                            type="button"
                            onClick={() => setLanguage("es")}
                            aria-label={t("a11y.lang.es")}
                            aria-pressed={language === "es"}
                            className={cn(
                                "h-6 w-6 rounded-full overflow-hidden border",
                                language === "es"
                                    ? "border-primary shadow-sm grayscale-0"
                                    : "border-transparent grayscale opacity-60"
                            )}
                        >
                            <FlagARG aria-hidden="true" className="h-full w-full object-cover" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setLanguage("pt")}
                            aria-label={t("a11y.lang.pt")}
                            aria-pressed={language === "pt"}
                            className={cn(
                                "h-6 w-6 rounded-full overflow-hidden border",
                                language === "pt"
                                    ? "border-primary shadow-sm grayscale-0"
                                    : "border-transparent grayscale opacity-60"
                            )}
                        >
                            <FlagBRA aria-hidden="true" className="h-full w-full object-cover" />
                        </button>
                    </div>

                    {/* Declarative Popover Invoker Button (declarative-dialog-popover-control guide) */}
                    <button
                        ref={triggerRef}
                        type="button"
                        aria-label={t("a11y.menu.toggle")}
                        aria-expanded={isPopoverOpen}
                        onClick={handleTriggerClick}
                        {...({ commandfor: popoverId, command: "toggle-popover" } as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors"
                    >
                        <Menu aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
            </nav>

            {/* Native Top-Layer Mobile Menu Popover */}
            <div
                ref={popoverRef}
                id={popoverId}
                {...({ popover: "auto" } as React.HTMLAttributes<HTMLDivElement>)}
                className={cn(
                    "mobile-nav-popover fixed inset-x-4 top-20 mx-auto max-w-md flex-col gap-5 rounded-[2rem] bg-card/95 backdrop-blur-xl p-8 shadow-2xl border border-primary/15 text-foreground lg:hidden",
                    isPopoverOpen && "flex opacity-100 translate-y-0 scale-100"
                )}
            >
                <Link
                    href="#features"
                    className="text-center text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-1"
                    onClick={closeMobileMenu}
                >
                    {t("nav.categories")}
                </Link>
                <Link
                    href="#story"
                    className="text-center text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-1"
                    onClick={closeMobileMenu}
                >
                    {t("nav.history")}
                </Link>
                <Link
                    href="#local"
                    className="text-center text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-1"
                    onClick={closeMobileMenu}
                >
                    {t("nav.gallery")}
                </Link>
                <Link
                    href="#location"
                    className="text-center text-sm font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-1"
                    onClick={closeMobileMenu}
                >
                    {t("nav.location")}
                </Link>

                <ObfuscatedContact
                    value="5493454128571"
                    type="phone"
                    text={t("hero.cta.whatsapp")}
                    message={t("ready.whatsapp.message")}
                    className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-full bg-primary font-black tracking-widest text-xs uppercase text-white hover:bg-primary/90 transition-colors hover:text-white shadow-lg"
                >
                    <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
                </ObfuscatedContact>
            </div>
        </header>
    );
}
