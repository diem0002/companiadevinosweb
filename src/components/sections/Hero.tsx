
"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
            {/* Background Decorative Blobs */}
            <div className="absolute -left-20 top-0 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute -right-20 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[100px]" />

            <div className="container relative z-10 grid gap-12 px-6 lg:grid-cols-2 lg:items-center">
                {/* Text Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <h1 className="text-balance text-6xl font-black leading-tight text-foreground md:text-7xl lg:text-8xl">
                        {t("hero.title")}
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl font-medium text-muted-foreground lg:mx-0">
                        {t("hero.subtitle")}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                        <Button size="xl" className="rounded-full shadow-xl hover:scale-105 transition-transform">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            {t("hero.cta.catalog")}
                        </Button>
                        <Button variant="outline" size="xl" className="rounded-full border-primary/20 hover:scale-105 transition-transform">
                            {t("hero.cta.whatsapp")}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
                    <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[3rem] bg-accent/20" />
                    <div className="relative h-full w-full overflow-hidden rounded-[3rem] border border-white/20 shadow-2xl transition-transform hover:-translate-y-2 duration-500">
                        <Image
                            src={placeholderImages.hero}
                            alt="Premium Wine Selection"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Glass Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
