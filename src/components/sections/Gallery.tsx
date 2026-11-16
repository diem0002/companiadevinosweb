"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { MessageCircle, Sparkles } from "lucide-react";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function Gallery() {
    const { t } = useLanguage();

    const verticalItems = [
        {
            src: placeholderImages.etiquetasAutor,
            tag: t("gallery.item2.tag"),
            title: t("gallery.item2.title"),
            desc: t("gallery.item2.desc"),
        },
        {
            src: placeholderImages.coleccionEsmeralda,
            tag: t("gallery.item4.tag"),
            title: t("gallery.item4.title"),
            desc: t("gallery.item4.desc"),
        },
        {
            src: placeholderImages.granReserva,
            tag: t("gallery.item1.tag"),
            title: t("gallery.item1.title"),
            desc: t("gallery.item1.desc"),
        },
        {
            src: placeholderImages.regaleria,
            tag: t("gallery.item3.tag"),
            title: t("gallery.item3.title"),
            desc: t("gallery.item3.desc"),
        },
    ];

    return (
        <section id="local" className="py-24 scroll-mt-28 relative overflow-hidden">
            <div className="container mx-auto px-6 fluid-container">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                    <div className="space-y-3 max-w-2xl">
                        <span className="text-xs font-black tracking-[0.22em] text-accent uppercase flex items-center gap-2">
                            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                            {t("gallery.overline")}
                        </span>
                        <h2 className="fluid-section-title font-black text-primary leading-[0.94] uppercase">
                            {t("gallery.title.line1")}{" "}
                            <span className="text-accent">{t("gallery.title.accent")}</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-md text-base font-medium leading-relaxed">
                        {t("gallery.subtitle")}
                    </p>
                </div>

                {/* Panoramic 16:9 Featured Shelf Banner */}
                <div className="scroll-reveal-card group relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border-4 border-card editorial-photo-card mb-8">
                    <Image
                        src={placeholderImages.estanteria}
                        alt={t("gallery.item5.title")}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#230b14]/90 via-[#230b14]/35 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
                        <div className="space-y-2 max-w-xl">
                            <span className="inline-block rounded-full bg-accent px-3.5 py-1 text-[0.65rem] font-black tracking-[0.2em] uppercase text-white shadow">
                                {t("gallery.item5.tag")}
                            </span>
                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
                                {t("gallery.item5.title")}
                            </h3>
                            <p className="text-sm md:text-base text-white/85 font-medium">
                                {t("gallery.item5.desc")}
                            </p>
                        </div>

                        <ObfuscatedContact
                            value="5493454128571"
                            type="phone"
                            text={t("gallery.cta")}
                            message={t("ready.whatsapp.message")}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-accent hover:text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 shadow-xl transition-colors shrink-0"
                        >
                            <MessageCircle aria-hidden="true" className="h-4 w-4" />
                        </ObfuscatedContact>
                    </div>
                </div>

                {/* 4 Vertical 9:16 Editorial Cards — designed specifically for vertical photography */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {verticalItems.map((item, idx) => (
                        <article
                            key={idx}
                            className="scroll-reveal-card group relative aspect-[9/14] w-full rounded-[2.25rem] overflow-hidden border-4 border-card editorial-photo-card"
                        >
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Studio Lighting & Vignette Overlay */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1e0810]/95 via-[#1e0810]/30 to-transparent"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 space-y-2 text-white">
                                <span className="inline-block rounded-full bg-primary/90 border border-white/20 px-3 py-0.5 text-[0.62rem] font-black tracking-[0.18em] text-accent uppercase">
                                    {item.tag}
                                </span>
                                <h3 className="text-lg font-black uppercase leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-white/80 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
