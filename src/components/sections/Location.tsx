
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Clock, MapPin } from "lucide-react";

export function Location() {
    const { t } = useLanguage();

    return (
        <section id="location" className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Info */}
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black text-foreground md:text-5xl">
                            {t("location.title")}
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-6 glass rounded-[2rem]">
                                <MapPin className="h-8 w-8 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                                    <p className="text-muted-foreground">{t("location.address")}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 glass rounded-[2rem]">
                                <Clock className="h-8 w-8 text-accent shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Horarios</h3>
                                    <p className="text-muted-foreground">{t("location.hours")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-[400px] w-full overflow-hidden rounded-[3rem] border-4 border-white shadow-xl">
                        <iframe
                            title="Ubicación Compañía de Vinos"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.049666065584!2d-58.02058692347366!3d-31.393437296068694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ade81bc134064d%3A0x60032e57865c36f0!2sSan%20Luis%201220%2C%20E3200%20Concordia%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses!2sar!4v1709664483756!5m2!1ses!2sar"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
