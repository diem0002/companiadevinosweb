"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, MessageCircle, Pause, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import placeholderImages from "@/lib/placeholder-images.json";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function Hero() {
    const { t } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    // Dynamically switch video source when resizing or toggling DevTools mobile emulation
    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: 768px)");
        setIsDesktop(desktopQuery.matches);

        const handleViewportChange = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        desktopQuery.addEventListener("change", handleViewportChange);
        return () => desktopQuery.removeEventListener("change", handleViewportChange);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.load();

        // Respect prefers-reduced-motion on autoplay video (lazy-load-video-and-audio & motion guides)
        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const syncReducedMotion = (prefersReduced: boolean) => {
            if (prefersReduced) {
                video.pause();
                setIsPaused(true);
            } else {
                video.play().catch(() => {
                    setIsPaused(true);
                });
                setIsPaused(false);
            }
        };

        syncReducedMotion(reducedMotionQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            syncReducedMotion(event.matches);
        };

        reducedMotionQuery.addEventListener("change", handleChange);
        return () => reducedMotionQuery.removeEventListener("change", handleChange);
    }, [isDesktop]);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPaused(false);
        } else {
            video.pause();
            setIsPaused(true);
        }
    };

    const activeVideoSrc = isDesktop
        ? `${placeholderImages.heroVideoDesktop}?v=3`
        : `${placeholderImages.heroVideoMobile}?v=3`;

    return (
        <section className="relative flex min-h-[100svh] items-end md:items-center pt-20 pb-20 md:pb-10 overflow-hidden bg-[#ECE6DC]">
            {/* Full-frame background video behind the title:
                - 16:9 widescreen version (1920x1080) on desktop/tablet with the animation right-aligned and positioned below the Navbar
                - 9:16 mobile version (1080x1920) on mobile screens with the animation centered in the upper half above the card
                - Explicit integer width & height, no loading="lazy" above the fold (lazy-load-video-and-audio guide) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#ECE6DC]">
                <video
                    ref={videoRef}
                    src={activeVideoSrc}
                    width={isDesktop ? 1920 : 1080}
                    height={isDesktop ? 1080 : 1920}
                    poster={`${placeholderImages.heroPoster}?v=3`}
                    preload="metadata"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover object-center"
                />
            </div>

            {/* Foreground Content - Compact on mobile so the upper 52% shows the full storefront animation */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 fluid-container">
                <div className="max-w-[440px] md:max-w-[470px] mx-auto md:mx-0 space-y-2.5 md:space-y-4 bg-card/88 backdrop-blur-md p-4 sm:p-5 md:p-7 rounded-[1.75rem] md:rounded-[2rem] border border-primary/15 shadow-2xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[0.6rem] md:text-[0.65rem] font-black tracking-[0.16em] text-primary uppercase">
                        <Sparkles aria-hidden="true" className="h-3 w-3 md:h-3.5 md:w-3.5 text-accent shrink-0" />
                        <span>{t("hero.overline")}</span>
                    </div>

                    <h1 className="text-[clamp(1.65rem,3.3vw+0.5rem,3.2rem)] font-black text-primary leading-[0.94] tracking-tight uppercase">
                        {t("hero.title.line1")}{" "}
                        <span className="text-accent inline md:block md:mt-1">{t("hero.title.accent")}</span>
                    </h1>

                    <p className="text-xs sm:text-sm md:text-[0.95rem] text-foreground/85 font-medium leading-relaxed">
                        {t("hero.subtitle")}
                    </p>

                    {/* Product Pillar Pills */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 pt-0.5">
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-bold text-primary">
                            {t("hero.badge.years")}
                        </span>
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-bold text-foreground/80">
                            {t("hero.badge.selection")}
                        </span>
                    </div>

                    {/* Primary & Secondary CTAs */}
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-2.5 pt-1">
                        <ObfuscatedContact
                            value="5493454128571"
                            type="phone"
                            text={t("hero.cta.whatsapp")}
                            message={t("ready.whatsapp.message")}
                            className="inline-flex items-center justify-center gap-2 h-10 md:h-11 rounded-full bg-primary hover:bg-primary/95 text-white hover:text-white font-black tracking-wider text-[11px] md:text-xs uppercase px-5 shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] border border-white/15"
                        >
                            <MessageCircle aria-hidden="true" className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent" />
                        </ObfuscatedContact>

                        <a
                            href="#local"
                            className="inline-flex items-center justify-center gap-1.5 h-9 md:h-11 rounded-full bg-secondary hover:bg-secondary/80 text-primary font-bold text-[11px] md:text-xs px-4 transition-colors border border-primary/15"
                        >
                            <span>{t("hero.cta.explore")}</span>
                            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Accessible Pause/Play control moved to bottom-left so bottom-right is dedicated to the Wine Bottle WhatsApp button */}
            <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPaused ? t("a11y.video.play") : t("a11y.video.pause")}
                className="absolute bottom-5 left-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/85 text-white shadow-lg backdrop-blur-md border border-white/20 hover:bg-primary transition-colors cursor-pointer"
            >
                {isPaused ? (
                    <Play aria-hidden="true" className="h-4 w-4 fill-current" />
                ) : (
                    <Pause aria-hidden="true" className="h-4 w-4 fill-current" />
                )}
            </button>
        </section>
    );
}
