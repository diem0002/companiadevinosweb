
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">

                <div className="grid lg:grid-cols-3 gap-12 mb-20">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-white overflow-hidden p-1">
                                <img src="/lib/logo.png" alt="Logo" className="h-full w-full object-cover rounded-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                            </div>
                            <div className="leading-none">
                                <span className="block font-black text-lg">COMPAÑÍA DE</span>
                                <span className="block font-black text-lg text-accent">VINOS</span>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm italic font-medium leading-relaxed">
                            {t("footer.quote")}
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link
                                href="https://www.instagram.com/companiadevinosconcordia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://www.facebook.com/CompaniaDeVinosConcordia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Menu */}
                    <div>
                        <h4 className="font-black text-xs tracking-[0.2em] text-accent uppercase mb-8">{t("footer.menu")}</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/70">
                            <li><Link href="#story" className="hover:text-white transition-colors">{t("nav.history")}</Link></li>
                            <li><Link href="#prices" className="hover:text-white transition-colors">{t("nav.prices")}</Link></li>
                            <li><Link href="#location" className="hover:text-white transition-colors">{t("nav.location")}</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="font-black text-xs tracking-[0.2em] text-accent uppercase mb-8">{t("footer.contact")}</h4>
                        <ul className="space-y-6 text-sm text-white/70">
                            <li className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <MapPin className="h-4 w-4 text-accent" />
                                </div>
                                <span className="leading-tight">{t("location.address")}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Phone className="h-4 w-4 text-accent" />
                                </div>
                                <ObfuscatedContact value="+54 9 345 412-8571" type="phone" />
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Mail className="h-4 w-4 text-accent" />
                                </div>
                                <ObfuscatedContact value="companiadevinos_cdia@yahoo.com.ar" type="email" className="break-all" />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-2 text-[0.6rem] uppercase font-bold tracking-widest text-white/30">
                    <p>{t("footer.rights")}</p>
                    <p className="opacity-50 hover:opacity-100 transition-opacity cursor-default">by diem</p>
                </div>
            </div>
        </footer>
    );
}
