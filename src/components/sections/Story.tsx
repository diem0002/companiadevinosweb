"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { Grape, Flame, Gift, MessageCircle } from "lucide-react";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function Story() {
    const { t } = useLanguage();

    const pillars = [
        {
            icon: <Grape aria-hidden="true" className="h-5 w-5 text-primary" />,
            title: t("story.card1.title"),
            desc: t("story.card1.desc"),
            featured: false,
        },
        {
            icon: <Flame aria-hidden="true" className="h-5 w-5 text-accent" />,
            title: t("story.card2.title"),
            desc: t("story.card2.desc"),
            featured: true,
        },
        {
            icon: <Gift aria-hidden="true" className="h-5 w-5 text-primary" />,
            title: t("story.card3.title"),
            desc: t("story.card3.desc"),
            featured: false,
        },
        {
            icon: <MessageCircle aria-hidden="true" className="h-5 w-5 text-accent" />,
            title: t("story.card4.title"),
            desc: t("story.card4.desc"),
            featured: true,
        },
    ];

    return (
        <section id="story" className="relative py-24 scroll-mt-28 overflow-hidden bg-secondary/45">
            {/* Subtle Burgundy & Gold Ambient Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[110px]"
            />

            <div className="container relative z-10 mx-auto px-6 fluid-container">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Vertical 9:16 Dual Photo Composition */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 items-center">
                        <div className="relative aspect-[9/15] w-full rounded-[2.25rem] overflow-hidden border-4 border-card editorial-photo-card -rotate-1 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src={placeholderImages.granReserva}
                                alt="Gran Reserva Malbec en las estanterías de Compañía de Vinos"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                            />
                        </div>

                        <div className="relative aspect-[9/15] w-full rounded-[2.25rem] overflow-hidden border-4 border-card editorial-photo-card translate-y-6 rotate-1 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src={placeholderImages.regaleria}
                                alt="Set de regalería con vino Malbec, copas de cristal y aireador"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                            />
                        </div>
                    </div>

                    {/* Right: Content & Updated Product Cards */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-3">
                            <span className="text-xs font-black tracking-[0.22em] text-primary uppercase flex items-center gap-3">
                                <span aria-hidden="true" className="h-[2px] w-8 bg-accent" />
                                {t("story.identity")}
                            </span>
                            <h2 className="fluid-section-title font-black text-primary leading-[0.94] uppercase">
                                {t("story.title.line1")}{" "}
                                <span className="text-accent block">{t("story.title.accent")}</span>
                            </h2>
                        </div>

                        <p className="text-base md:text-lg text-foreground/85 font-medium leading-relaxed">
                            {t("story.p1")}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed border-l-4 border-accent pl-5 py-1">
                            {t("story.p2")}
                        </p>

                        {/* 4 Cards replacing the old Curaduría card */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                            {pillars.map((pillar, i) => (
                                <div
                                    key={i}
                                    className={
                                        pillar.featured
                                            ? "scroll-reveal-card bg-primary text-white rounded-3xl p-6 shadow-lg border border-primary/20"
                                            : "scroll-reveal-card bg-card text-foreground rounded-3xl p-6 shadow-sm border border-primary/10 hover:border-accent/40 transition-colors"
                                    }
                                >
                                    <div className="flex items-center gap-3 mb-2.5">
                                        <div
                                            className={
                                                pillar.featured
                                                    ? "h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
                                                    : "h-9 w-9 rounded-xl bg-secondary flex items-center justify-center shrink-0"
                                            }
                                        >
                                            {pillar.icon}
                                        </div>
                                        <h3
                                            className={
                                                pillar.featured
                                                    ? "font-black text-xs uppercase tracking-wider text-accent"
                                                    : "font-black text-xs uppercase tracking-wider text-primary"
                                            }
                                        >
                                            {pillar.title}
                                        </h3>
                                    </div>
                                    <p
                                        className={
                                            pillar.featured
                                                ? "text-xs text-white/85 leading-relaxed"
                                                : "text-xs text-muted-foreground leading-relaxed"
                                        }
                                    >
                                        {pillar.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2">
                            <ObfuscatedContact
                                value="5493454128571"
                                type="phone"
                                text={t("story.cta")}
                                message={t("ready.whatsapp.message")}
                                className="inline-flex items-center justify-center gap-2.5 h-13 rounded-full bg-primary hover:bg-primary/90 text-white hover:text-white font-black tracking-wider text-xs uppercase px-8 shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]"
                            >
                                <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
                            </ObfuscatedContact>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
