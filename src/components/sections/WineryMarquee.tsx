"use client";

import React from "react";

interface WineryLogo {
    name: string;
    src: string;
    heightClass: string;
}

const WINERY_LOGOS: WineryLogo[] = [
    {
        name: "Catena Zapata",
        src: "/images/bodegas/catena-zapata.png",
        heightClass: "h-6 md:h-7",
    },
    {
        name: "Rutini Wines",
        src: "/images/bodegas/rutini.png",
        heightClass: "h-7 md:h-8",
    },
    {
        name: "Luigi Bosca",
        src: "/images/bodegas/luigi-bosca.png",
        heightClass: "h-11 md:h-12",
    },
    {
        name: "Bodegas Salentein",
        src: "/images/bodegas/salentein.png",
        heightClass: "h-12 md:h-14",
    },
    {
        name: "Escorihuela Gascón",
        src: "/images/bodegas/escorihuela-gascon.png",
        heightClass: "h-14 md:h-16",
    },
    {
        name: "Bodega Trapiche",
        src: "/images/bodegas/trapiche.png",
        heightClass: "h-12 md:h-14",
    },
    {
        name: "Nieto Senetiner",
        src: "/images/bodegas/nieto-senetiner.png",
        heightClass: "h-11 md:h-12",
    },
    {
        name: "Zuccardi Valle de Uco",
        src: "/images/bodegas/zuccardi.png",
        heightClass: "h-12 md:h-14",
    },
    {
        name: "Bodega Norton",
        src: "/images/bodegas/norton.png",
        heightClass: "h-14 md:h-16",
    },
    {
        name: "Alamos",
        src: "/images/bodegas/alamos.png",
        heightClass: "h-7 md:h-8",
    },
    {
        name: "Casarena Bodega y Viñedos",
        src: "/images/bodegas/casarena.png",
        heightClass: "h-10 md:h-12",
    },
    {
        name: "Finca La Celia",
        src: "/images/bodegas/la-celia.png",
        heightClass: "h-14 md:h-16",
    },
    {
        name: "Bodega Sottano",
        src: "/images/bodegas/sottano.png",
        heightClass: "h-6 md:h-7",
    },
];

export function WineryMarquee() {
    const marqueeItems = [...WINERY_LOGOS, ...WINERY_LOGOS];

    return (
        <section
            aria-label="Bodegas que trabajamos"
            className="relative bg-[#F5F2EB] border-t border-[#23080D]/10 py-12 md:py-16 overflow-hidden select-none"
        >
            {/* Subtle section label */}
            <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-10 flex flex-col items-center justify-center gap-1.5">
                <div className="flex items-center justify-center gap-4">
                    <span className="h-[1px] w-10 md:w-16 bg-[#7A1C24]/25" />
                    <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[#23080D]/65 text-center font-medium">
                        Bodegas &amp; Etiquetas que Trabajamos
                    </p>
                    <span className="h-[1px] w-10 md:w-16 bg-[#7A1C24]/25" />
                </div>
                <p className="font-serif italic text-xs md:text-sm text-[#7A1C24]/80 tracking-wide">
                    y muchas más...
                </p>
            </div>

            {/* Edge fade masks */}
            <div className="winery-marquee-shell relative w-full overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-36 bg-gradient-to-r from-[#F5F2EB] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-36 bg-gradient-to-l from-[#F5F2EB] to-transparent z-10" />

                <div className="winery-marquee-track flex flex-nowrap items-center w-max">
                    {marqueeItems.map((winery, idx) => (
                        <div
                            key={`${winery.name}-${idx}`}
                            aria-hidden={idx >= WINERY_LOGOS.length ? "true" : undefined}
                            className="group flex items-center shrink-0"
                        >
                            <div className="px-8 md:px-12 py-2 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105 shrink-0">
                                <img
                                    src={winery.src}
                                    alt={idx >= WINERY_LOGOS.length ? "" : `Logo oficial ${winery.name}`}
                                    loading="eager"
                                    decoding="async"
                                    draggable={false}
                                    className={`${winery.heightClass} w-auto max-w-none object-contain pointer-events-none select-none`}
                                />
                            </div>

                            {/* Diamond separator */}
                            <span
                                aria-hidden="true"
                                className="text-[#C5A059]/45 text-[9px] shrink-0"
                            >
                                ◆
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
