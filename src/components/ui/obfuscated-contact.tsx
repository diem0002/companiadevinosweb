"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ObfuscatedContactProps {
    value: string;
    type: "email" | "phone";
    className?: string;
    text?: string; // Optional custom text to display instead of the value
}

export function ObfuscatedContact({ value, type, className, text }: ObfuscatedContactProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const href = type === "email" ? `mailto:${value}` : `https://wa.me/${value.replace(/\D/g, "")}`;
    const displayValue = text || value;

    if (!isClient) {
        // Render a placeholder or partially obscured text for bots/SSR
        return <span className={className}>Cargando contacto...</span>;
    }

    return (
        <a
            href={href}
            className={cn("hover:text-accent transition-colors", className)}
            target="_blank"
            rel="noopener noreferrer"
        >
            {displayValue}
        </a>
    );
}
