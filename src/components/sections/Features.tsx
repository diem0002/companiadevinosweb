
"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { BadgeCheck, Grape, Truck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Features() {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Grape className="h-10 w-10 text-primary" />,
            titleKey: "feature.curated.title",
            descKey: "feature.curated.desc",
        },
        {
            icon: <BadgeCheck className="h-10 w-10 text-accent" />,
            titleKey: "feature.sommelier.title",
            descKey: "feature.sommelier.desc",
        },
        {
            icon: <Truck className="h-10 w-10 text-primary" />,
            titleKey: "feature.delivery.title",
            descKey: "feature.delivery.desc",
        }
    ];

    return (
        <section id="features" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="glass hover:bg-white/80 transition-colors border-none shadow-lg">
                            <CardHeader className="flex flex-col items-center text-center">
                                <div className="mb-4 rounded-full bg-primary/5 p-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl font-bold">{t(feature.titleKey)}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                <p>{t(feature.descKey)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
