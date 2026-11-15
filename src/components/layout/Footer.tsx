"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white pt-20 pb-12 overflow-hidden border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-primary overflow-hidden border-2 border-white/80 shrink-0">
                                <img
                                    src="/lib/logo.png"
                                    alt="Logo de Compañía de Vinos"
                                    width={48}
                                    height={48}
                                    loading="lazy"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                            <div className="leading-none">
                                <span className="block font-black text-lg tracking-tight">COMPAÑÍA DE</span>
                                <span className="block font-black text-lg text-accent tracking-tight">VINOS</span>
                            </div>
                        </div>

                        <p className="text-white/75 text-sm italic font-medium leading-relaxed max-w-sm">
                            {t("footer.quote")}
                        </p>

                        <div className="flex gap-3 pt-1">
                            <Link
                                href="https://www.instagram.com/companiadevinosconcordia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t("a11y.social.instagram")}
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                            >
                                <Instagram aria-hidden="true" className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://www.facebook.com/CompaniaDeVinosConcordia"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t("a11y.social.facebook")}
                                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                            >
                                <Facebook aria-hidden="true" className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Menu (Sequential h3 heading per accessibility guide) */}
                    <div>
                        <h3 className="font-black text-xs tracking-[0.2em] text-accent uppercase mb-6">
                            {t("footer.menu")}
                        </h3>
                        <ul className="space-y-3.5 text-sm font-medium text-white/80">
                            <li>
                                <Link href="#features" className="hover:text-white transition-colors">
                                    {t("nav.categories")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#story" className="hover:text-white transition-colors">
                                    {t("nav.history")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#local" className="hover:text-white transition-colors">
                                    {t("nav.gallery")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#location" className="hover:text-white transition-colors">
                                    {t("nav.location")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="font-black text-xs tracking-[0.2em] text-accent uppercase mb-6">
                            {t("footer.contact")}
                        </h3>
                        <ul className="space-y-5 text-sm text-white/80">
                            <li className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                    <MapPin aria-hidden="true" className="h-4 w-4 text-accent" />
                                </div>
                                <span className="leading-snug">{t("location.address")}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                    <Phone aria-hidden="true" className="h-4 w-4 text-accent" />
                                </div>
                                <ObfuscatedContact
                                    value="+54 9 345 412-8571"
                                    type="phone"
                                    message={t("ready.whatsapp.message")}
                                />
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                    <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
                                </div>
                                <ObfuscatedContact
                                    value="companiadevinos_cdia@yahoo.com.ar"
                                    type="email"
                                    className="break-all"
                                />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-2 text-[0.65rem] uppercase font-bold tracking-widest text-white/50">
                    <p>{t("footer.rights")}</p>
                    <p className="opacity-70 hover:opacity-100 transition-opacity cursor-default">by diem</p>
                </div>
            </div>
        </footer>
    );
}
