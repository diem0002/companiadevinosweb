
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Grape, Sparkles, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Features() {

    const { t } = useLanguage();

    const features = [
        {
            icon: <Grape className="h-8 w-8 text-primary" />,
            title: t("feature.author.title"),
            desc: t("feature.author.desc"),
            color: "bg-primary/10"
        },
        {
            icon: <Sparkles className="h-8 w-8 text-accent" />,
            title: t("feature.sommelier.title"),
            desc: t("feature.sommelier.desc"),
            color: "bg-accent/10"
        },
        {
            icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
            title: t("feature.delivery.title"),
            desc: t("feature.delivery.desc"),
            color: "bg-green-100"
        }
    ];

    return (
        <section id="features" className="py-24 relative scroll-mt-32">
            <div className="container mx-auto px-6">
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className={`h-20 w-20 rounded-[2rem] flex items-center justify-center ${feature.color} rotate-3 group-hover:rotate-6 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-wide text-primary">{feature.title}</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed max-w-xs">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
