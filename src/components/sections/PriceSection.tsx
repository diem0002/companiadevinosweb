
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Search, Link as LinkIcon, Clock } from "lucide-react";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

export function PriceSection() {
    const { t } = useLanguage();

    return (
        <section id="prices" className="py-24 scroll-mt-32">
            <div className="container mx-auto px-6">
                <div className="relative overflow-hidden rounded-[4rem] bg-primary px-8 py-20 md:px-20 md:py-24 shadow-2xl">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

                    <div className="relative z-10 grid gap-16 lg:grid-cols-2 items-center">
                        <div className="space-y-8">
                            <div className="inline-block px-3 py-1 rounded-full border border-white/20 text-[0.6rem] font-bold tracking-widest text-white/80 uppercase">
                                {t("price.tag")}
                            </div>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9]">
                                {t("price.title").split(" ").map((word, i) => (
                                    <span key={i} className={word === "PRECIOS" || word === "PREÇOS" ? "text-accent block" : "block"}>{word} </span>
                                ))}
                            </h2>
                            <p className="max-w-md text-white/80 font-medium leading-relaxed">
                                {t("price.desc")}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-white/60 text-xs">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-accent" /> {t("price.feature.stock")}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Search className="h-4 w-4 text-accent" /> {t("price.feature.search")}
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-accent" /> {t("price.feature.update")}
                                </div>
                                <div className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4 text-accent" /> {t("price.feature.whatsapp")}
                                </div>
                            </div>

                            <a
                                href="https://diem0002.github.io/Carta-online-compania-de-vinos/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-14 bg-accent text-white hover:bg-accent/90 rounded-full shadow-lg font-black tracking-wide px-10 mt-4 text-base transition-colors"
                            >
                                {t("price.cta")}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </div>

                        {/* Phone Mockup Area */}
                        <div className="relative mx-auto w-full max-w-xs h-[500px]">
                            {/* The Phone */}
                            <div className="relative h-full w-full bg-black rounded-[3rem] border-[12px] border-black shadow-2xl overflow-hidden rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src={placeholderImages.mockup}
                                    alt="App Mockup"
                                    fill
                                    className="object-cover opacity-60"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 p-6 text-center">
                                    <Smartphone className="h-16 w-16 mb-4 text-white/50" />
                                    <span className="font-bold">{t("price.app")}</span>
                                </div>
                            </div>

                            {/* Floating Tag */}
                            <div className="absolute bottom-10 -right-10 bg-accent text-white p-4 rounded-2xl shadow-xl animate-pulse">
                                <Search className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
