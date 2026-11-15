"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Wine, Sparkles, GlassWater, Gift } from "lucide-react";

export function Features() {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Wine aria-hidden="true" className="h-8 w-8 text-primary" />,
            title: t("feature.wines.title"),
            desc: t("feature.wines.desc"),
            badgeBg: "bg-primary/10 border-primary/20",
        },
        {
            icon: <Sparkles aria-hidden="true" className="h-8 w-8 text-accent" />,
            title: t("feature.spirits.title"),
            desc: t("feature.spirits.desc"),
            badgeBg: "bg-accent/15 border-accent/25",
        },
        {
            icon: <GlassWater aria-hidden="true" className="h-8 w-8 text-primary" />,
            title: t("feature.glassware.title"),
            desc: t("feature.glassware.desc"),
            badgeBg: "bg-primary/10 border-primary/20",
        },
        {
            icon: <Gift aria-hidden="true" className="h-8 w-8 text-accent" />,
            title: t("feature.gifts.title"),
            desc: t("feature.gifts.desc"),
            badgeBg: "bg-accent/15 border-accent/25",
        },
    ];

    return (
        <section id="features" className="py-24 relative scroll-mt-28">
            <div className="container mx-auto px-6 fluid-container">
                <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
                    <span className="text-xs font-black tracking-[0.22em] text-accent uppercase block">
                        {t("features.overline")}
                    </span>
                    <h2 className="fluid-section-title font-black text-primary leading-[0.95] uppercase">
                        {t("features.title.line1")}{" "}
                        <span className="text-accent">{t("features.title.accent")}</span>
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg font-medium">
                        {t("features.subtitle")}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <article
                            key={index}
                            className="scroll-reveal-card group relative bg-card rounded-[2.25rem] p-8 border border-primary/10 shadow-[0_18px_45px_-15px_rgba(99,39,64,0.1)] hover:shadow-[0_25px_55px_-12px_rgba(99,39,64,0.2)] transition-transform duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                        >
                            <div className="space-y-5">
                                <div
                                    className={`h-16 w-16 rounded-2xl border flex items-center justify-center ${feature.badgeBg} transition-transform duration-300 group-hover:scale-105`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-wide text-primary leading-snug">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                            <div className="mt-6 h-1 w-12 rounded-full bg-accent/40 group-hover:w-20 group-hover:bg-accent transition-all" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
