
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function ReadyCTA() {
    const { t } = useLanguage();

    return (
        <section className="bg-primary py-32 relative overflow-hidden">
            {/* Background radial soft */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-none mb-6 tracking-tight">
                    {t("ready.title").split("PARA")[0]} PARA <br />
                    <span className="text-accent">{t("ready.title").split("PARA")[1] || "UN BRINDIS?"}</span>
                </h2>
                <p className="text-white/70 max-w-lg mx-auto mb-10 text-lg">
                    {t("ready.desc")}
                </p>

                <ObfuscatedContact
                    value="5493454128571"
                    type="phone"
                    text={t("ready.cta")}
                    className="inline-flex items-center justify-center bg-accent text-white hover:bg-accent/90 rounded-full font-black tracking-widest px-10 py-4 shadow-2xl shadow-black/20 text-sm transition-transform hover:scale-105 hover:text-white"
                />
            </div>
        </section>
    );
}
