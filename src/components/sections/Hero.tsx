
"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative flex min-h-[90vh] items-center pt-32 pb-16 overflow-hidden">

            {/* Background radial gradient for subtle depth */}
            <div className="absolute left-[-20%] top-[-20%] h-[800px] w-[800px] rounded-full bg-accent/5 blur-[120px]" />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Content */}
                <div className="space-y-8 max-w-2xl">
                    <div className="space-y-2">
                        <span className="text-xs font-black tracking-[0.2em] text-accent uppercase block mb-4">
                            {t("hero.overline")}
                        </span>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.9] tracking-tight">
                            {t("hero.title").split("BRINDAR")[0]} <br />
                            <span className="text-accent">{t("hero.title").split("DE")[1] || "BRINDAR"}</span>
                        </h1>
                    </div>

                    <p className="text-lg text-muted-foreground/80 max-w-md font-medium leading-relaxed">
                        {t("hero.subtitle")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                            href="https://diem0002.github.io/Carta-online-compania-de-vinos/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-xl shadow-primary/20 transition-all hover:scale-105 group"
                        >
                            {t("hero.cta.catalog")}
                            <ChevronRight className="ml-2 h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative h-[600px] w-full hidden lg:block group perspective-1000">
                    <div className="absolute right-0 top-0 bottom-0 w-[90%] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-white transition-all duration-700 ease-out transform group-hover:rotate-1 group-hover:scale-[1.02] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                        <Image
                            src={placeholderImages.hero}
                            alt="Premium Wine Selection"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            priority
                            unoptimized
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>
                </div>
            </div>
        </section>
    );
}
