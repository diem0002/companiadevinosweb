"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
    Calculator,
    Check,
    GlassWater,
    MessageCircle,
    Minus,
    Plus,
    Snowflake,
    Sparkles,
    Users,
    Wine,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

type EventType = "toast" | "dinner" | "party";
type Intensity = "moderate" | "standard" | "intense";

type DrinkKey =
    | "wine"
    | "beer"
    | "fernet"
    | "gancia"
    | "gin"
    | "whisky"
    | "sparkling"
    | "wineZero"
    | "beerZero";

interface BottlePlan {
    bottles1L: number;
    bottles750: number;
    bottles450: number;
    mixer225: number;
    mixer15: number;
}

/**
 * Computes exact Fernet / Gancia bottle sizes and their matching mixer bottles:
 * - 450 ml (chico): 1 × 2,25 L
 * - 750 ml (estándar): 2 × 1,5 L
 * - 1 L (grande): 1 × 2,25 L + 1 × 1,5 L
 */
function computeSpiritAndMixerPlan(drinksNeeded: number): BottlePlan {
    if (drinksNeeded <= 0) {
        return { bottles1L: 0, bottles750: 0, bottles450: 0, mixer225: 0, mixer15: 0 };
    }

    let remaining = drinksNeeded;
    let bottles1L = Math.floor(remaining / 20);
    remaining = remaining % 20;

    let bottles750 = 0;
    let bottles450 = 0;

    if (remaining > 15) {
        bottles1L += 1;
    } else if (remaining > 9) {
        bottles750 = 1;
    } else if (remaining > 0) {
        bottles450 = 1;
    }

    const mixer225 = bottles1L * 1 + bottles450 * 1;
    const mixer15 = bottles1L * 1 + bottles750 * 2;

    return { bottles1L, bottles750, bottles450, mixer225, mixer15 };
}

export function DrinkCalculator() {
    const { language } = useLanguage();
    const isPt = language === "pt";

    const [adults, setAdults] = useState(16);
    const [nonDrinkers, setNonDrinkers] = useState(2);
    const [eventType, setEventType] = useState<EventType>("dinner");
    const [intensity, setIntensity] = useState<Intensity>("standard");
    const [selected, setSelected] = useState<Record<DrinkKey, boolean>>({
        wine: true,
        beer: true,
        fernet: true,
        gancia: false,
        gin: false,
        whisky: false,
        sparkling: true,
        wineZero: false,
        beerZero: false,
    });

    const toggleDrink = (key: DrinkKey) => {
        setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const result = useMemo(() => {
        const baseDrinksPerPerson: Record<EventType, number> = {
            toast: 2.2,
            dinner: 4.0,
            party: 6.0,
        };
        const intensityFactor: Record<Intensity, number> = {
            moderate: 0.75,
            standard: 1.0,
            intense: 1.35,
        };

        const totalAlcoholicServings =
            adults * baseDrinksPerPerson[eventType] * intensityFactor[intensity];

        // Sparkling for toast is calculated separately (1 bottle per 6 adults)
        const sparklingBottles = selected.sparkling ? Math.max(1, Math.ceil(adults / 6)) : 0;

        // Main pool weights distributed ONLY across selected alcoholic options
        const weights: { key: Exclude<DrinkKey, "sparkling" | "wineZero" | "beerZero">; w: number }[] = [
            { key: "wine", w: 42 },
            { key: "beer", w: 32 },
            { key: "fernet", w: 18 },
            { key: "gancia", w: 14 },
            { key: "gin", w: 14 },
            { key: "whisky", w: 10 },
        ];

        const activePool = weights.filter((item) => selected[item.key]);
        const totalWeight = activePool.reduce((acc, item) => acc + item.w, 0);

        const shareFor = (key: Exclude<DrinkKey, "sparkling" | "wineZero" | "beerZero">) => {
            if (!selected[key] || totalWeight === 0) return 0;
            const item = activePool.find((x) => x.key === key);
            return item ? totalAlcoholicServings * (item.w / totalWeight) : 0;
        };

        // 1. Wine (5 glasses per 750ml bottle)
        const wineServings = shareFor("wine");
        const wineBottles = selected.wine ? Math.max(1, Math.ceil(wineServings / 5)) : 0;

        // 2. Beer (~1.2 servings per 473ml can)
        const beerServings = shareFor("beer");
        const beerCans = selected.beer ? Math.max(2, Math.ceil(beerServings * 1.15)) : 0;

        // 3. Fernet + Gaseosa Cola (exact 450ml / 750ml / 1L rule)
        const fernetPlan = computeSpiritAndMixerPlan(Math.round(shareFor("fernet")));

        // 4. Gancia + Gaseosa Lima-Limón (exact 450ml / 750-950ml / 1L rule)
        const ganciaPlan = computeSpiritAndMixerPlan(Math.round(shareFor("gancia")));

        // 5. Gin + Tónica (~14 drinks per 750ml bottle -> 2 × 1.5L tonic per bottle)
        const ginServings = shareFor("gin");
        const ginBottles = selected.gin ? Math.max(1, Math.ceil(ginServings / 14)) : 0;
        const tonicBottles15 = ginBottles * 2;

        // 6. Whisky (~15 pours per 750ml bottle)
        const whiskyServings = shareFor("whisky");
        const whiskyBottles = selected.whisky ? Math.max(1, Math.ceil(whiskyServings / 15)) : 0;

        // 7. Zero-Alcohol Options (for nonDrinkers or mixed preference)
        const zeroConsumerBase = Math.max(nonDrinkers, 2);
        const zeroDrinksBudget =
            zeroConsumerBase *
            (eventType === "toast" ? 1.8 : eventType === "dinner" ? 2.5 : 3.5);

        const zeroActiveCount = (selected.wineZero ? 1 : 0) + (selected.beerZero ? 1 : 0);
        const wineZeroBottles = selected.wineZero
            ? Math.max(1, Math.ceil((zeroDrinksBudget / Math.max(1, zeroActiveCount)) / 5))
            : 0;
        const beerZeroCans = selected.beerZero
            ? Math.max(2, Math.ceil(zeroDrinksBudget / Math.max(1, zeroActiveCount)))
            : 0;

        // 8. Table Soft Drinks & Water (strictly separate from mixers!)
        const tableSodaLiters =
            nonDrinkers > 0
                ? Math.ceil(nonDrinkers * (eventType === "party" ? 1.5 : 1.0))
                : 0;
        const tableSodaBottles225 = tableSodaLiters > 0 ? Math.ceil(tableSodaLiters / 2.25) : 0;

        // 9. Ice recommendation
        const totalGuests = adults + nonDrinkers;
        const hasMixedOrBeer = selected.beer || selected.fernet || selected.gancia || selected.gin || selected.whisky;
        const iceKg = Math.max(2, Math.ceil(totalGuests * (hasMixedOrBeer ? 1.0 : 0.5)));

        return {
            wineBottles,
            beerCans,
            fernetPlan,
            ganciaPlan,
            ginBottles,
            tonicBottles15,
            whiskyBottles,
            sparklingBottles,
            wineZeroBottles,
            beerZeroCans,
            tableSodaBottles225,
            iceKg,
            hasAnyAlcohol: totalWeight > 0 || selected.sparkling,
        };
    }, [adults, nonDrinkers, eventType, intensity, selected]);

    const formatBottlePlan = (plan: BottlePlan) => {
        const parts: string[] = [];
        if (plan.bottles1L > 0) parts.push(`${plan.bottles1L}× 1 L`);
        if (plan.bottles750 > 0) parts.push(`${plan.bottles750}× 750 ml`);
        if (plan.bottles450 > 0) parts.push(`${plan.bottles450}× 450 ml`);
        return parts.join(" + ");
    };

    const formatMixerPlan = (plan: BottlePlan, label: string) => {
        const parts: string[] = [];
        if (plan.mixer225 > 0) parts.push(`${plan.mixer225}× 2,25 L`);
        if (plan.mixer15 > 0) parts.push(`${plan.mixer15}× 1,5 L`);
        if (parts.length === 0) return "";
        return `${parts.join(" + ")} ${label}`;
    };

    const whatsappMessage = useMemo(() => {
        const eventLabels: Record<EventType, string> = isPt
            ? { toast: "Brinde / Aperitivo", dinner: "Churrasco / Jantar", party: "Festa Longa" }
            : { toast: "Brindis / Previa", dinner: "Asado / Cena", party: "Fiesta / Cumpleaños" };

        const intensityLabels: Record<Intensity, string> = isPt
            ? { moderate: "Moderado", standard: "Padrão", intense: "Intenso" }
            : { moderate: "Moderado", standard: "Estándar", intense: "Intenso" };

        const lines: string[] = [];
        if (result.wineBottles > 0) lines.push(`• Vino: ${result.wineBottles} botellas`);
        if (result.beerCans > 0) lines.push(`• Cerveza: ${result.beerCans} latas/porrones`);
        if (result.fernetPlan.bottles1L + result.fernetPlan.bottles750 + result.fernetPlan.bottles450 > 0) {
            lines.push(
                `• Fernet: ${formatBottlePlan(result.fernetPlan)} (con ${formatMixerPlan(result.fernetPlan, "de gaseosa cola")})`
            );
        }
        if (result.ganciaPlan.bottles1L + result.ganciaPlan.bottles750 + result.ganciaPlan.bottles450 > 0) {
            lines.push(
                `• Aperitivo tipo Gancia: ${formatBottlePlan(result.ganciaPlan)} (con ${formatMixerPlan(result.ganciaPlan, "de gaseosa lima-limón")})`
            );
        }
        if (result.ginBottles > 0) {
            lines.push(`• Gin: ${result.ginBottles} botella/s 750 ml (con ${result.tonicBottles15}× 1,5 L tónica)`);
        }
        if (result.whiskyBottles > 0) lines.push(`• Whisky: ${result.whiskyBottles} botella/s 750 ml`);
        if (result.sparklingBottles > 0) lines.push(`• Espumante (brindis): ${result.sparklingBottles} botellas`);
        if (result.wineZeroBottles > 0) lines.push(`• Vino sin alcohol: ${result.wineZeroBottles} botellas`);
        if (result.beerZeroCans > 0) lines.push(`• Cerveza sin alcohol: ${result.beerZeroCans} latas/porrones`);
        if (result.tableSodaBottles225 > 0) {
            lines.push(`• Sin alcohol para mesa: ${result.tableSodaBottles225}× 2,25 L gaseosas/agua`);
        }

        return `Hola Compañía de Vinos! Usé la calculadora de la web para un ${eventLabels[eventType]} (${adults} adultos${nonDrinkers > 0 ? ` + ${nonDrinkers} sin alcohol` : ""}, consumo ${intensityLabels[intensity]}):\n${lines.join("\n")}\n\n¿Qué opciones y precios me recomiendan?`;
    }, [adults, nonDrinkers, eventType, intensity, result, isPt]);

    const drinkChips: { key: DrinkKey; label: string; zero?: boolean }[] = [
        { key: "wine", label: isPt ? "Vinho" : "Vino" },
        { key: "beer", label: isPt ? "Cerveja" : "Cerveza" },
        { key: "fernet", label: "Fernet" },
        { key: "gancia", label: isPt ? "Aperitivo / Gancia" : "Gancia / Aperitivo" },
        { key: "gin", label: "Gin" },
        { key: "whisky", label: "Whisky" },
        { key: "sparkling", label: isPt ? "Espumante (Brinde)" : "Espumante (Brindis)" },
        { key: "wineZero", label: isPt ? "Vinho sem álcool" : "Vino sin alcohol", zero: true },
        { key: "beerZero", label: isPt ? "Cerveja sem álcool" : "Cerveza sin alcohol", zero: true },
    ];

    const hasFernet =
        result.fernetPlan.bottles1L + result.fernetPlan.bottles750 + result.fernetPlan.bottles450 > 0;
    const hasGancia =
        result.ganciaPlan.bottles1L + result.ganciaPlan.bottles750 + result.ganciaPlan.bottles450 > 0;

    return (
        <section id="calculadora" className="py-24 scroll-mt-28 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 fluid-container">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                    <div className="space-y-3 max-w-2xl">
                        <span className="text-xs font-black tracking-[0.22em] text-accent uppercase flex items-center gap-2">
                            <Calculator aria-hidden="true" className="h-3.5 w-3.5" />
                            {isPt ? "FERRAMENTA PARA SEU EVENTO" : "HERRAMIENTA PARA TU REUNIÓN"}
                        </span>
                        <h2 className="fluid-section-title font-black text-primary leading-[0.94] uppercase">
                            {isPt ? "CALCULADORA DE" : "CALCULADORA DE"}{" "}
                            <span className="text-accent">{isPt ? "BEBIDAS" : "BEBIDAS"}</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-md text-base font-medium leading-relaxed">
                        {isPt
                            ? "Calcule as quantidades ideais sem sobrar nem faltar. Definimos as marcas juntos pelo WhatsApp."
                            : "Calculá las cantidades exactas para tu asado, brindis o fiesta sin quedarte corto. Las marcas las elegimos juntos por WhatsApp."}
                    </p>
                </div>

                {/* Main Calculator Card */}
                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left: Controls */}
                    <div className="lg:col-span-7 bg-card rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-primary/12 shadow-xl space-y-8">
                        {/* 1. Guest Counters */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Adults */}
                            <div className="rounded-3xl bg-secondary/55 p-5 border border-primary/10 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-2">
                                        <Users aria-hidden="true" className="h-4 w-4 text-accent" />
                                        {isPt ? "Adultos (bebem)" : "Adultos que toman"}
                                    </span>
                                    <span className="text-2xl font-black text-primary tabular-nums">{adults}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setAdults((v) => Math.max(2, v - 1))}
                                        aria-label="Restar un adulto"
                                        className="h-9 w-9 rounded-full bg-card border border-primary/15 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shrink-0"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <input
                                        type="range"
                                        min={2}
                                        max={150}
                                        value={adults}
                                        onChange={(e) => setAdults(Number(e.target.value))}
                                        aria-label={isPt ? "Quantidade de adultos" : "Cantidad de adultos"}
                                        className="w-full cursor-pointer"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setAdults((v) => Math.min(150, v + 1))}
                                        aria-label="Sumar un adulto"
                                        className="h-9 w-9 rounded-full bg-card border border-primary/15 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shrink-0"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Non-drinkers / kids */}
                            <div className="rounded-3xl bg-secondary/55 p-5 border border-primary/10 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-2">
                                        <GlassWater aria-hidden="true" className="h-4 w-4 text-accent" />
                                        {isPt ? "Sem álcool / Crianças" : "Sin alcohol / Niños"}
                                    </span>
                                    <span className="text-2xl font-black text-primary tabular-nums">{nonDrinkers}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setNonDrinkers((v) => Math.max(0, v - 1))}
                                        aria-label="Restar invitado sin alcohol"
                                        className="h-9 w-9 rounded-full bg-card border border-primary/15 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shrink-0"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <input
                                        type="range"
                                        min={0}
                                        max={80}
                                        value={nonDrinkers}
                                        onChange={(e) => setNonDrinkers(Number(e.target.value))}
                                        aria-label={isPt ? "Convidados sem álcool" : "Invitados sin alcohol"}
                                        className="w-full cursor-pointer"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setNonDrinkers((v) => Math.min(80, v + 1))}
                                        aria-label="Sumar invitado sin alcohol"
                                        className="h-9 w-9 rounded-full bg-card border border-primary/15 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shrink-0"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 2. Event Duration + Consumption Profile */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2.5">
                                <span className="text-xs font-black uppercase tracking-wider text-primary block">
                                    {isPt ? "Tipo de Evento" : "Tipo de Reunión"}
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                    {(
                                        [
                                            { id: "toast", label: isPt ? "Brinde\n1-2h" : "Brindis\n1-2 hs" },
                                            { id: "dinner", label: isPt ? "Jantar\n3-4h" : "Asado\n3-4 hs" },
                                            { id: "party", label: isPt ? "Festa\n5+h" : "Fiesta\n5+ hs" },
                                        ] as { id: EventType; label: string }[]
                                    ).map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => setEventType(opt.id)}
                                            aria-pressed={eventType === opt.id}
                                            className={`rounded-2xl py-2.5 px-2 text-xs font-bold whitespace-pre-line leading-tight border transition-all cursor-pointer ${
                                                eventType === opt.id
                                                    ? "bg-primary text-white border-primary shadow-md"
                                                    : "bg-secondary/60 text-foreground/80 border-primary/10 hover:border-primary/30"
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <span className="text-xs font-black uppercase tracking-wider text-primary block">
                                    {isPt ? "Perfil de Consumo" : "¿Qué tanto toman?"}
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                    {(
                                        [
                                            { id: "moderate", label: isPt ? "Moderado" : "Moderado" },
                                            { id: "standard", label: isPt ? "Padrão" : "Estándar" },
                                            { id: "intense", label: isPt ? "Intenso" : "Intenso" },
                                        ] as { id: Intensity; label: string }[]
                                    ).map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => setIntensity(opt.id)}
                                            aria-pressed={intensity === opt.id}
                                            className={`rounded-2xl py-3 px-2 text-xs font-bold border transition-all cursor-pointer ${
                                                intensity === opt.id
                                                    ? "bg-accent text-white border-accent shadow-md"
                                                    : "bg-secondary/60 text-foreground/80 border-primary/10 hover:border-accent/40"
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Drink Selection */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs font-black uppercase tracking-wider text-primary">
                                    {isPt ? "O que vão servir?" : "¿Qué bebidas va a haber?"}
                                </span>
                                <span className="text-[11px] font-semibold text-muted-foreground">
                                    {isPt
                                        ? "Também temos vinhos e cervejas 0% álcool"
                                        : "Incluí opciones sin alcohol si querés"}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {drinkChips.map((chip) => {
                                    const active = selected[chip.key];
                                    return (
                                        <button
                                            key={chip.key}
                                            type="button"
                                            onClick={() => toggleDrink(chip.key)}
                                            aria-pressed={active}
                                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold border transition-all cursor-pointer ${
                                                active
                                                    ? chip.zero
                                                        ? "bg-[#1f8e46] text-white border-[#1f8e46] shadow-md"
                                                        : "bg-primary text-white border-primary shadow-md"
                                                    : "bg-secondary/65 text-foreground/80 border-primary/12 hover:border-primary/35"
                                            }`}
                                        >
                                            <span
                                                className={`h-4 w-4 rounded-full flex items-center justify-center ${
                                                    active ? "bg-white/25" : "bg-primary/10"
                                                }`}
                                            >
                                                {active && <Check className="h-3 w-3" />}
                                            </span>
                                            <span>{chip.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Live Results Card */}
                    <div className="lg:col-span-5 bg-primary text-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10 flex flex-col justify-between gap-6">
                        <div className="space-y-5">
                            <div className="flex items-center justify-between border-b border-white/15 pb-4">
                                <div className="flex items-center gap-2.5">
                                    <Wine aria-hidden="true" className="h-5 w-5 text-accent" />
                                    <h3 className="font-black text-sm uppercase tracking-wider">
                                        {isPt ? "Resumo Sugerido" : "Tu Lista Sugerida"}
                                    </h3>
                                </div>
                                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-accent">
                                    {adults + nonDrinkers} {isPt ? "convidados" : "personas"}
                                </span>
                            </div>

                            {/* Primary Bottles */}
                            <ul className="space-y-2.5 text-sm">
                                {result.wineBottles > 0 && (
                                    <li className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                                        <span className="font-bold">{isPt ? "Vinho (750 ml)" : "Vino (750 ml)"}</span>
                                        <span className="font-black text-accent">
                                            {result.wineBottles} {result.wineBottles === 1 ? "botella" : "botellas"}
                                            {result.wineBottles >= 6 && (
                                                <span className="text-white/75 font-medium text-xs ml-1.5">
                                                    ({Math.floor(result.wineBottles / 6)} caja/s{result.wineBottles % 6 > 0 ? ` + ${result.wineBottles % 6}` : ""})
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                )}

                                {result.beerCans > 0 && (
                                    <li className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                                        <span className="font-bold">{isPt ? "Cerveja" : "Cerveza"}</span>
                                        <span className="font-black text-accent">
                                            ~{result.beerCans} {isPt ? "latas / long necks" : "latas / porrones"}
                                        </span>
                                    </li>
                                )}

                                {hasFernet && (
                                    <li className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                                        <span className="font-bold">Fernet</span>
                                        <span className="font-black text-accent">
                                            {formatBottlePlan(result.fernetPlan)}
                                        </span>
                                    </li>
                                )}

                                {hasGancia && (
                                    <li className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                                        <span className="font-bold">{isPt ? "Aperitivo / Gancia" : "Gancia / Aperitivo"}</span>
                                        <span className="font-black text-accent">
                                            {formatBottlePlan(result.ganciaPlan)}
                                        </span>
                                    </li>
                                )}

                                {result.ginBottles > 0 && (
                                    <li className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                                        <span className="font-bold">Gin (750 ml)</span>
                                        <span className="font-black text-accent">
                                            {result.ginBottles} {result.ginBottles === 1 ? "botella" : "botellas"}
                                        </span>
                                    </li>
                                )}

                                {result.whiskyBottles > 0 && (
                                    <li className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                                        <span className="font-bold">Whisky (750 ml)</span>
                                        <span className="font-black text-accent">
                                            {result.whiskyBottles} {result.whiskyBottles === 1 ? "botella" : "botellas"}
                                        </span>
                                    </li>
                                )}

                                {result.sparklingBottles > 0 && (
                                    <li className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                                        <span className="font-bold">{isPt ? "Espumante (Brinde)" : "Espumante (Brindis)"}</span>
                                        <span className="font-black text-accent">
                                            {result.sparklingBottles} {result.sparklingBottles === 1 ? "botella" : "botellas"}
                                        </span>
                                    </li>
                                )}

                                {result.wineZeroBottles > 0 && (
                                    <li className="flex items-center justify-between rounded-2xl bg-[#1f8e46]/35 border border-[#25D366]/40 px-4 py-3">
                                        <span className="font-bold">{isPt ? "Vinho 0% álcool" : "Vino sin alcohol"}</span>
                                        <span className="font-black text-[#a7f3c0]">
                                            {result.wineZeroBottles} {result.wineZeroBottles === 1 ? "botella" : "botellas"}
                                        </span>
                                    </li>
                                )}

                                {result.beerZeroCans > 0 && (
                                    <li className="flex items-center justify-between rounded-2xl bg-[#1f8e46]/35 border border-[#25D366]/40 px-4 py-3">
                                        <span className="font-bold">{isPt ? "Cerveja 0% álcool" : "Cerveza sin alcohol"}</span>
                                        <span className="font-black text-[#a7f3c0]">
                                            ~{result.beerZeroCans} {isPt ? "latas / long necks" : "latas / porrones"}
                                        </span>
                                    </li>
                                )}
                            </ul>

                            {/* Separate Mixers, Table Soft Drinks & Ice Box */}
                            <div className="rounded-3xl bg-black/20 border border-white/10 p-4 space-y-2 text-xs text-white/85">
                                <span className="font-black uppercase tracking-wider text-accent flex items-center gap-1.5">
                                    <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                                    {isPt ? "Acompanhamentos & Gelo" : "Mezcladores, Sin Alcohol y Hielo"}
                                </span>

                                {hasFernet && (
                                    <p>
                                        • <strong>{isPt ? "Para o Fernet:" : "Para el Fernet:"}</strong>{" "}
                                        {formatMixerPlan(result.fernetPlan, isPt ? "de refrigerante cola" : "de gaseosa cola")}
                                    </p>
                                )}

                                {hasGancia && (
                                    <p>
                                        • <strong>{isPt ? "Para o Gancia:" : "Para el Gancia:"}</strong>{" "}
                                        {formatMixerPlan(result.ganciaPlan, isPt ? "de refrigerante limão" : "de gaseosa lima-limón")}
                                    </p>
                                )}

                                {result.ginBottles > 0 && (
                                    <p>
                                        • <strong>{isPt ? "Para o Gin:" : "Para el Gin:"}</strong>{" "}
                                        {result.tonicBottles15}× 1,5 L {isPt ? "de água tônica" : "de agua tónica"}
                                    </p>
                                )}

                                {result.tableSodaBottles225 > 0 && (
                                    <p>
                                        • <strong>{isPt ? "Para quem não bebe álcool:" : "Gaseosas / agua para mesa:"}</strong>{" "}
                                        {result.tableSodaBottles225}× 2,25 L ({nonDrinkers}{" "}
                                        {isPt ? "pessoas" : "personas"})
                                    </p>
                                )}

                                <p className="flex items-center gap-1.5 pt-0.5 text-white/90">
                                    <Snowflake aria-hidden="true" className="h-3.5 w-3.5 text-accent shrink-0" />
                                    <span>
                                        <strong>{isPt ? "Gelo recomendado:" : "Hielo sugerido:"}</strong> ~{result.iceKg} kg
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-1">
                            <ObfuscatedContact
                                value="5493454128571"
                                type="phone"
                                text={isPt ? "Consultar Marcas e Preços no WhatsApp" : "Elegir Marcas y Consultar por WhatsApp"}
                                message={whatsappMessage}
                                className="inline-flex items-center justify-center gap-2.5 w-full h-13 rounded-full bg-accent hover:bg-accent/90 text-white hover:text-white font-black tracking-wider text-xs uppercase px-6 shadow-xl transition-transform hover:scale-[1.02]"
                            >
                                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                            </ObfuscatedContact>
                            <p className="text-[11px] text-center text-white/65">
                                {isPt
                                    ? "Cálculo orientativo. Definimos juntos os rótulos de acordo com seu orçamento."
                                    : "Cálculo orientativo. Las marcas y etiquetas las elegimos juntos según tu presupuesto."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
