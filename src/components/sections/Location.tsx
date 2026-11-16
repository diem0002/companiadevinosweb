"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Clock, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function Location() {
    const { t } = useLanguage();

    return (
        <section id="location" className="py-24 bg-secondary/40 scroll-mt-28">
            <div className="container mx-auto px-6 fluid-container">
                <div className="mb-14 space-y-2">
                    <span className="text-xs font-black tracking-[0.22em] text-primary uppercase block">
                        {t("location.overline")}
                    </span>
                    <h2 className="fluid-section-title font-black text-primary leading-[0.94] uppercase">
                        {t("location.title.line1")}{" "}
                        <span className="text-accent">{t("location.title.accent")}</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Column: Real Storefront Photo ("frente") + Address & Hours Cards */}
                    <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                        {/* Real Storefront Photo Card */}
                        <div className="scroll-reveal-card group relative aspect-[16/10] w-full rounded-[2.25rem] overflow-hidden border-4 border-card editorial-photo-card">
                            <Image
                                src={placeholderImages.frenteLocal}
                                alt="Frente del local de Compañía de Vinos en San Luis 1220, Concordia"
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#230b14]/90 via-[#230b14]/25 to-transparent"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-1.5">
                                <span className="inline-block rounded-full bg-primary/90 border border-white/20 px-3.5 py-1 text-[0.65rem] font-black tracking-[0.18em] text-accent uppercase">
                                    {t("location.facade.badge")}
                                </span>
                                <p className="text-xs sm:text-sm text-white/90 font-medium">
                                    {t("location.facade.caption")}
                                </p>
                            </div>
                        </div>

                        {/* Address & Hours */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-card p-6 rounded-[1.75rem] border border-primary/10 shadow-sm flex items-start gap-4">
                                <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin aria-hidden="true" className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-black text-xs uppercase mb-1.5 tracking-wider text-primary">
                                        {t("location.address.title")}
                                    </h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-snug">
                                        {t("location.address")}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-[1.75rem] border border-primary/10 shadow-sm flex items-start gap-4">
                                <div className="h-11 w-11 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                                    <Clock aria-hidden="true" className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-black text-xs uppercase mb-1.5 tracking-wider text-primary">
                                        {t("location.hours.title")}
                                    </h3>
                                    <p className="text-muted-foreground text-xs font-medium leading-relaxed">
                                        {t("location.hours")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3.5">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=San+Luis+1220,+Concordia,+Entre+Ríos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-xs uppercase tracking-wider font-black text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                            >
                                <span>{t("location.cta.maps")}</span>
                                <ExternalLink aria-hidden="true" className="h-4 w-4 text-accent" />
                            </a>

                            <ObfuscatedContact
                                value="5493454128571"
                                type="phone"
                                text={t("location.cta.whatsapp")}
                                message={t("ready.whatsapp.message")}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-card border border-primary/20 px-7 text-xs uppercase tracking-wider font-black text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                                <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
                            </ObfuscatedContact>
                        </div>
                    </div>

                    {/* Right Column: Interactive Map */}
                    <div className="lg:col-span-6 h-[420px] lg:h-auto lg:min-h-full bg-card p-3.5 rounded-[2.5rem] shadow-xl border border-primary/10 flex flex-col">
                        <div className="relative flex-1 w-full min-h-[390px] rounded-[2rem] overflow-hidden">
                            <iframe
                                title="Mapa de ubicación de Compañía de Vinos en San Luis 1220, Concordia"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "390px" }}
                                allowFullScreen
                                className="absolute inset-0 h-full w-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.049666065584!2d-58.02058692347366!3d-31.393437296068694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ade81bc134064d%3A0x60032e57865c36f0!2sSan%20Luis%201220%2C%20E3200%20Concordia%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses!2sar!4v1709664483756!5m2!1ses!2sar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
