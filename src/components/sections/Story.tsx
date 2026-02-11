
"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { Button } from "@/components/ui/button";

export function Story() {
    const { t } = useLanguage();

    return (
        <section id="story" className="relative py-24 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute right-0 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

            <div className="container relative z-10 mx-auto px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Image Grid */}
                    <div className="relative grid gap-4">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl transition-transform hover:scale-[1.02]">
                            <Image
                                src={placeholderImages.story}
                                alt="Tradición en Concordia"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-primary md:text-5xl">
                            {t("story.title")}
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground/80">
                            {t("story.content")}
                        </p>
                        <div className="pt-4">
                            <Button variant="premium" size="lg" className="rounded-full shadow-gold/20 shadow-xl">
                                Conocer más sobre nosotros
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
