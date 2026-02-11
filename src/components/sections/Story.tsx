
"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { Star, Mic, Heart } from "lucide-react";

export function Story() {
    const { t } = useLanguage();

    return (
        <section id="story" className="relative py-24 scroll-mt-32 overflow-hidden">

            {/* Ambient Glow */}
            <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />

            <div className="container relative z-10 mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image Composition */}
                    <div className="relative">
                        <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl">
                            <Image
                                src={placeholderImages.story}
                                alt={t("story.title")}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary flex items-center justify-center shadow-xl border-4 border-white animate-bounce-slow">
                            <Star className="h-10 w-10 text-accent fill-accent" />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-xs font-black tracking-[0.2em] text-primary uppercase flex items-center gap-2">
                                <span className="h-[2px] w-8 bg-accent" />
                                {t("story.identity")}
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black text-primary leading-[0.9]">
                                {t("story.title").split(" ")[0]} <br />
                                <span className="text-accent">{t("story.title").split(" ").slice(1).join(" ")}</span>
                            </h2>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t("story.p1")}
                        </p>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed border-l-4 border-accent pl-4">
                            {t("story.p2")}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 hover:border-accent/30 transition-colors">
                                <Heart className="h-6 w-6 text-primary mb-3" />
                                <h4 className="font-black text-sm uppercase mb-1">{t("story.badge.curated")}</h4>
                                <p className="text-xs text-muted-foreground">{t("story.badge.curated.desc")}</p>
                            </div>
                            <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
                                <Mic className="h-6 w-6 text-primary mb-3" />
                                <h4 className="font-black text-sm uppercase mb-1">{t("story.badge.excellence")}</h4>
                                <p className="text-xs text-muted-foreground">{t("story.badge.excellence.desc")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
