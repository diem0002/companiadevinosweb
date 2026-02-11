
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Clock, MapPin } from "lucide-react";

export function Location() {
    const { t } = useLanguage();

    return (
        <section id="location" className="py-24 bg-white scroll-mt-32">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <span className="text-xs font-black tracking-[0.2em] text-primary uppercase block mb-2">
                        {t("location.overline")}
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-primary leading-none uppercase">
                        {t("location.title").split(" ").slice(0, 2).join(" ")} <br />
                        <span className="text-accent">{t("location.title").split(" ").slice(2).join(" ")}</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* Info Cards */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <div className="bg-secondary/30 p-8 rounded-[2rem] flex items-start gap-6 group hover:bg-secondary/50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase mb-2 tracking-wider text-primary">{t("location.address.title")}</h4>
                                <p className="text-muted-foreground text-lg leading-snug">{t("location.address")}</p>
                            </div>
                        </div>

                        <div className="bg-secondary/30 p-8 rounded-[2rem] flex items-start gap-6 group hover:bg-secondary/50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                <Clock className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase mb-2 tracking-wider text-primary">{t("location.hours.title")}</h4>
                                <p className="text-muted-foreground text-lg leading-snug">{t("location.hours")}</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=San+Luis+1220,+Concordia,+Entre+Ríos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all w-full md:w-auto"
                            >
                                {t("location.cta")}
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="order-1 lg:order-2 h-[500px] w-full bg-white p-4 rounded-[3rem] shadow-2xl border border-black/5 rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="h-full w-full rounded-[2.5rem] overflow-hidden">
                            <iframe
                                title="Ubicación Compañía de Vinos"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(0%)" }}
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.049666065584!2d-58.02058692347366!3d-31.393437296068694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ade81bc134064d%3A0x60032e57865c36f0!2sSan%20Luis%201220%2C%20E3200%20Concordia%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses!2sar!4v1709664483756!5m2!1ses!2sar"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
