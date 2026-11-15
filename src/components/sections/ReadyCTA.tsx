"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle, Sparkles } from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";
import { ObfuscatedContact } from "../ui/obfuscated-contact";

export function ReadyCTA() {
    const { t } = useLanguage();
    const uid = useId().replace(/:/g, "");
    const [isClinking, setIsClinking] = useState(false);

    // Direct DOM refs for 60fps spring-physics wine & glass motion
    const leftGlassRef = useRef<SVGGElement>(null);
    const rightGlassRef = useRef<SVGGElement>(null);
    const leftWineRef = useRef<SVGPathElement>(null);
    const rightWineRef = useRef<SVGPathElement>(null);
    const sparkleRef = useRef<SVGGElement>(null);

    const physRef = useRef({
        hover: false,
        clinking: false,
        clinkStart: 0,
        // Glass tilt angles (degrees)
        glassAngle: 0,
        glassVel: 0,
        // Wine surface relative counter-tilt + slosh wave (degrees & wave amplitude)
        wineTilt: 0,
        wineVel: 0,
        waveAmp: 0,
        wavePhase: 0,
        sparkleAlpha: 0,
    });

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        let rafId = 0;
        let lastTime = performance.now();

        const buildWinePath = (cx: number, surfaceY: number, tiltDeg: number, wave: number) => {
            const rad = (tiltDeg * Math.PI) / 180;
            const halfW = 14;
            const dy = Math.tan(rad) * halfW;
            const yL = surfaceY - dy;
            const yR = surfaceY + dy;
            const ctrlY = surfaceY + wave;
            return `M ${cx - halfW} ${yL.toFixed(2)} Q ${cx} ${ctrlY.toFixed(2)} ${cx + halfW} ${yR.toFixed(2)} L ${cx + halfW} 36 L ${cx - halfW} 36 Z`;
        };

        const tick = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.035);
            lastTime = now;
            const p = physRef.current;

            // Target glass tilt based on hover or active clink timeline
            let targetGlass = p.hover ? 8 : 0;
            let stiffness = 170;
            let damping = 13;

            if (p.clinking) {
                const elapsed = now - p.clinkStart;
                if (elapsed < 180) {
                    // Swing inward to clink
                    targetGlass = 17;
                    stiffness = 420;
                    damping = 18;
                } else if (elapsed < 220) {
                    // Impact moment! Inject slosh impulse + golden sparkle
                    if (p.sparkleAlpha < 0.5) {
                        p.wineVel += 260;
                        p.waveAmp = 3.2;
                        p.sparkleAlpha = 1;
                    }
                    targetGlass = 16;
                } else if (elapsed < 720) {
                    // Recoil back to rest while wine keeps sloshing
                    targetGlass = p.hover ? 7 : 0;
                    stiffness = 180;
                    damping = 11;
                } else {
                    p.clinking = false;
                }
            }

            // Glass spring integration
            const prevGlassVel = p.glassVel;
            const glassAcc = (targetGlass - p.glassAngle) * stiffness - p.glassVel * damping;
            p.glassVel += glassAcc * dt;
            p.glassAngle += p.glassVel * dt;

            // Wine liquid feels horizontal gravity (-glassAngle) + inertial slosh from glass acceleration
            const targetWine = -p.glassAngle;
            const glassDeltaVel = p.glassVel - prevGlassVel;
            p.wineVel -= glassDeltaVel * 0.55;

            const wineAcc = (targetWine - p.wineTilt) * 115 - p.wineVel * 4.2;
            p.wineVel += wineAcc * dt;
            p.wineTilt += p.wineVel * dt;

            // Damped surface ripple
            p.wavePhase += dt * 16;
            p.waveAmp *= Math.pow(0.08, dt);
            const waveOffset = Math.sin(p.wavePhase) * p.waveAmp;

            // Fade impact sparkle
            p.sparkleAlpha = Math.max(0, p.sparkleAlpha - dt * 2.4);

            // Apply transforms directly to SVG nodes
            if (leftGlassRef.current) {
                leftGlassRef.current.setAttribute(
                    "transform",
                    `rotate(${p.glassAngle.toFixed(2)} 19 42)`
                );
            }
            if (rightGlassRef.current) {
                rightGlassRef.current.setAttribute(
                    "transform",
                    `rotate(${(-p.glassAngle).toFixed(2)} 39 42)`
                );
            }
            if (leftWineRef.current) {
                leftWineRef.current.setAttribute(
                    "d",
                    buildWinePath(19, 20.5, p.wineTilt, waveOffset)
                );
            }
            if (rightWineRef.current) {
                rightWineRef.current.setAttribute(
                    "d",
                    buildWinePath(39, 20.5, -p.wineTilt, -waveOffset)
                );
            }
            if (sparkleRef.current) {
                sparkleRef.current.setAttribute("opacity", p.sparkleAlpha.toFixed(2));
                const s = 0.7 + (1 - p.sparkleAlpha) * 0.5;
                sparkleRef.current.setAttribute(
                    "transform",
                    `translate(29 10) scale(${s.toFixed(2)}) translate(-29 -10)`
                );
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    const handleToastClick = () => {
        if (isClinking) return;

        const cleanPhone = "5493454128571";
        const encodedMsg = `?text=${encodeURIComponent(t("ready.whatsapp.message"))}`;
        const whatsappUrl = `https://wa.me/${cleanPhone}${encodedMsg}`;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            return;
        }

        setIsClinking(true);
        physRef.current.clinking = true;
        physRef.current.clinkStart = performance.now();
        physRef.current.sparkleAlpha = 0;

        // Open WhatsApp right after the clink impact and wine slosh are clearly visible
        window.setTimeout(() => {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        }, 620);

        window.setTimeout(() => {
            setIsClinking(false);
        }, 1100);
    };

    const clipLeftId = `bowl-left-${uid}`;
    const clipRightId = `bowl-right-${uid}`;

    return (
        <section className="py-20 px-4 md:px-6 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-20 md:px-16 md:py-24 text-center shadow-2xl border border-white/10 fluid-container">
                    {/* Subtle radial highlight */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
                    />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-[0.68rem] font-black tracking-[0.2em] text-accent uppercase">
                            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                            <span>{t("ready.overline")}</span>
                        </div>

                        <h2 className="fluid-section-title font-black text-white uppercase leading-[0.95] tracking-tight">
                            {t("ready.title.line1")}{" "}
                            <span className="text-accent block mt-1">{t("ready.title.accent")}</span>
                        </h2>

                        <p className="text-white/85 max-w-xl mx-auto text-base md:text-lg font-medium leading-relaxed">
                            {t("ready.desc")}
                        </p>

                        <div className="pt-4">
                            <ObfuscatedContact
                                value="5493454128571"
                                type="phone"
                                text={t("ready.cta")}
                                message={t("ready.whatsapp.message")}
                                className="inline-flex items-center justify-center gap-3 bg-accent text-white hover:bg-accent/90 hover:text-white rounded-full font-black tracking-widest px-10 py-5 shadow-2xl shadow-black/25 text-xs md:text-sm uppercase transition-transform hover:scale-105"
                            >
                                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                            </ObfuscatedContact>
                        </div>
                    </div>
                </div>
            </div>

            {/* Persistent Floating WhatsApp Button with Two Clinking Wine Glasses (Bottom Right) */}
            <button
                type="button"
                onClick={handleToastClick}
                onMouseEnter={() => {
                    physRef.current.hover = true;
                }}
                onMouseLeave={() => {
                    physRef.current.hover = false;
                }}
                aria-label={t("a11y.whatsapp.float")}
                className="fixed bottom-5 right-5 z-50 group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#17823d] to-[#25D366] hover:from-[#157537] hover:to-[#20bd5a] text-white pl-4 pr-2 py-1.5 shadow-[0_14px_34px_-6px_rgba(23,130,61,0.6)] border border-white/30 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
                {/* Clear WhatsApp Identity */}
                <div className="flex items-center gap-2">
                    <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-white shrink-0"
                        aria-hidden="true"
                    >
                        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.328-1.766-.641-3.094-1.328-5.109-4.453-5.266-4.656-.156-.203-1.266-1.672-1.266-3.188s.797-2.266 1.078-2.578c.281-.313.609-.391.813-.391s.406 0 .578.016c.188.016.438-.078.688.531.25.609.859 2.094.938 2.25.078.156.125.344.016.547-.109.203-.156.344-.313.531-.156.188-.328.406-.469.547-.156.156-.328.328-.141.641.188.313.844 1.391 1.813 2.25 1.25 1.109 2.297 1.453 2.609 1.609.313.156.5.125.688-.094.188-.219.797-.922 1.016-1.234.219-.313.422-.266.703-.156.281.109 1.813.859 2.125 1.016.313.156.516.234.594.359.078.125.078.734-.172 1.438z" />
                    </svg>
                    <span className="text-xs font-black uppercase tracking-wider leading-none">
                        WhatsApp
                    </span>
                </div>

                {/* Circular Wine Glasses Medallion with Live Fluid Physics */}
                <div className="relative h-11 w-11 rounded-full bg-[#FAF6F0] border border-[#632740]/20 shadow-inner flex items-center justify-center overflow-visible">
                    <svg
                        viewBox="0 0 58 46"
                        className="h-9 w-10 overflow-visible"
                        aria-hidden="true"
                    >
                        <defs>
                            {/* Inner Bowl Clip Paths for Realistic Liquid Containment */}
                            <clipPath id={clipLeftId}>
                                <path d="M 11 11 L 27 11 L 26.5 21 C 26 27 22.5 29.5 19 29.5 C 15.5 29.5 12 27 11.5 21 Z" />
                            </clipPath>
                            <clipPath id={clipRightId}>
                                <path d="M 31 11 L 47 11 L 46.5 21 C 46 27 42.5 29.5 39 29.5 C 35.5 29.5 32 27 31.5 21 Z" />
                            </clipPath>
                        </defs>

                        {/* Left Wine Glass */}
                        <g ref={leftGlassRef}>
                            {/* Wine Liquid (clipped to left bowl, driven by spring physics) */}
                            <g clipPath={`url(#${clipLeftId})`}>
                                <path
                                    ref={leftWineRef}
                                    d="M 5 20.5 Q 19 20.5 33 20.5 L 33 36 L 5 36 Z"
                                    fill="#632740"
                                />
                            </g>
                            {/* Crystal Glass Bowl */}
                            <path
                                d="M 11 11 L 27 11 L 26.5 21 C 26 27 22.5 29.5 19 29.5 C 15.5 29.5 12 27 11.5 21 Z"
                                fill="none"
                                stroke="#4a1c30"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                            />
                            {/* Stem & Base */}
                            <line x1="19" y1="29.5" x2="19" y2="40" stroke="#4a1c30" strokeWidth="1.6" strokeLinecap="round" />
                            <line x1="13.5" y1="40" x2="24.5" y2="40" stroke="#4a1c30" strokeWidth="1.8" strokeLinecap="round" />
                            {/* Crystal Highlight */}
                            <path d="M 13.5 13.5 L 13.8 20" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
                        </g>

                        {/* Right Wine Glass */}
                        <g ref={rightGlassRef}>
                            {/* Wine Liquid (clipped to right bowl, driven by spring physics) */}
                            <g clipPath={`url(#${clipRightId})`}>
                                <path
                                    ref={rightWineRef}
                                    d="M 25 20.5 Q 39 20.5 53 20.5 L 53 36 L 25 36 Z"
                                    fill="#7a2f4f"
                                />
                            </g>
                            {/* Crystal Glass Bowl */}
                            <path
                                d="M 31 11 L 47 11 L 46.5 21 C 46 27 42.5 29.5 39 29.5 C 35.5 29.5 32 27 31.5 21 Z"
                                fill="none"
                                stroke="#4a1c30"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                            />
                            {/* Stem & Base */}
                            <line x1="39" y1="29.5" x2="39" y2="40" stroke="#4a1c30" strokeWidth="1.6" strokeLinecap="round" />
                            <line x1="33.5" y1="40" x2="44.5" y2="40" stroke="#4a1c30" strokeWidth="1.8" strokeLinecap="round" />
                            {/* Crystal Highlight */}
                            <path d="M 33.5 13.5 L 33.8 20" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
                        </g>

                        {/* Golden Clink Impact Sparkle */}
                        <g ref={sparkleRef} opacity="0">
                            <path
                                d="M 29 4 L 30.2 8.8 L 35 10 L 30.2 11.2 L 29 16 L 27.8 11.2 L 23 10 L 27.8 8.8 Z"
                                fill="#D4943A"
                            />
                        </g>
                    </svg>
                </div>
            </button>
        </section>
    );
}
