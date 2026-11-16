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

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const desktopQuery = window.matchMedia("(min-width: 1024px)");
        let lastMatch = desktopQuery.matches;

        const ensurePlaying = () => {
            if (!video.paused) {
                setIsPaused(false);
                return;
            }
            video.play().then(() => {
                setIsPaused(false);
            }).catch(() => {
                setIsPaused(true);
            });
        };

        ensurePlaying();

        // Only reload video source when crossing the 1024px layout breakpoint
        const handleViewportChange = (event: MediaQueryListEvent) => {
            if (event.matches !== lastMatch) {
                lastMatch = event.matches;
                video.load();
                ensurePlaying();
            }
        };

        desktopQuery.addEventListener("change", handleViewportChange);
        return () => desktopQuery.removeEventListener("change", handleViewportChange);
    }, []);

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

    return (
        <section className="relative flex flex-col lg:flex-row lg:min-h-[100svh] lg:items-center pt-20 sm:pt-24 pb-12 lg:py-24 overflow-hidden bg-[#ECE6DC]">
            {/* Responsive Video Stage:
                - Mobile & Tablet (< 1024px): Dedicated top block in flex-col so it NEVER overlaps the title card below.
                  Uses aspect-[1/1] sm:aspect-[10/9] with object-[50%_15%] to frame the upper-half storefront animation of hero-mobile.mp4.
                - Desktop (>= 1024px): Full-bleed background layer with the storefront positioned on the right side
                  while the title card sits on the left. */}
            <div className="relative z-0 w-full max-w-[460px] mx-auto aspect-[1/1] sm:aspect-[10/9] lg:max-w-none lg:aspect-auto lg:absolute lg:inset-0 lg:h-full overflow-hidden bg-[#ECE6DC]">
                <video
                    ref={videoRef}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover object-[50%_15%] lg:object-[70%_center] xl:object-center"
                >
                    <source
                        media="(min-width: 1024px)"
                        src={placeholderImages.heroVideoDesktop}
                        type="video/mp4"
                    />
                    <source
                        src={placeholderImages.heroVideoMobile}
                        type="video/mp4"
                    />
                </video>

                {/* Seamless edge blending on mobile/tablet so the video stage merges into #ECE6DC */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#ECE6DC] to-transparent lg:hidden"
                />
            </div>

            {/* Foreground Content - Stacked below the video on mobile/tablet, left-aligned on desktop */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 fluid-container -mt-2 sm:mt-0">
                <div className="max-w-[440px] lg:max-w-[430px] xl:max-w-[470px] mx-auto lg:mx-0 space-y-2.5 md:space-y-4 bg-card/90 backdrop-blur-md p-5 sm:p-6 md:p-7 rounded-[1.75rem] md:rounded-[2rem] border border-primary/15 shadow-2xl">
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

            {/* Accessible Pause/Play control */}
            <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPaused ? t("a11y.video.play") : t("a11y.video.pause")}
                className="absolute bottom-4 left-4 md:bottom-5 md:left-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/85 text-white shadow-lg backdrop-blur-md border border-white/20 hover:bg-primary transition-colors cursor-pointer"
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
