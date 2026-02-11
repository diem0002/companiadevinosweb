
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-foreground text-background py-16 rounded-t-[3rem] mt-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <span className="text-2xl font-black">Compañía de Vinos</span>
                        <span className="text-sm text-background/60">Vinería Premium en Concordia</span>
                    </div>

                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-accent transition-colors">
                            <Instagram className="h-6 w-6" />
                        </Link>
                        <Link href="#" className="hover:text-accent transition-colors">
                            <Facebook className="h-6 w-6" />
                        </Link>
                        <Link href="#" className="hover:text-accent transition-colors">
                            <Twitter className="h-6 w-6" />
                        </Link>
                    </div>
                </div>

                <div className="mt-12 border-t border-background/10 pt-8 text-center text-sm text-background/40">
                    <p>{t("footer.rights")}</p>
                </div>
            </div>
        </footer>
    );
}
