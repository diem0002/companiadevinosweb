
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

export function PriceSection() {
    const { t } = useLanguage();

    return (
        <section id="prices" className="py-24">
            <div className="container mx-auto px-6">
                <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary to-primary/80 px-6 py-16 text-primary-foreground shadow-2xl md:px-16 md:py-24">

                    {/* Decorative Circles */}
                    <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute left-0 bottom-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

                    <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black md:text-5xl text-white">
                                {t("price.title")}
                            </h2>
                            <p className="max-w-xl text-lg text-white/90">
                                {t("price.desc")}
                            </p>
                            <Button
                                size="xl"
                                className="bg-white text-primary hover:bg-white/90 rounded-full shadow-lg font-bold"
                            >
                                {t("price.cta")}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>

                        {/* Phone Mockup Placeholder */}
                        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
                            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.5rem] border-[8px] border-white shadow-2xl bg-black">
                                <Image
                                    src={placeholderImages.mockup}
                                    alt="App Mockup"
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Smartphone className="h-16 w-16 text-white/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
