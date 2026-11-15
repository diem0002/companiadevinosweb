"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ObfuscatedContactProps {
    value: string;
    type: "email" | "phone";
    className?: string;
    text?: string;
    message?: string;
    ariaLabel?: string;
    children?: React.ReactNode;
}

export function ObfuscatedContact({
    value,
    type,
    className,
    text,
    message,
    ariaLabel,
    children,
}: ObfuscatedContactProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const cleanPhone = value.replace(/\D/g, "");
    const encodedMsg = message ? `?text=${encodeURIComponent(message)}` : "";
    const href =
        type === "email"
            ? `mailto:${value}`
            : `https://wa.me/${cleanPhone}${encodedMsg}`;
    const displayValue = text || value;

    if (!isClient) {
        return (
            <span className={cn("inline-flex items-center gap-2", className)}>
                {children}
                <span>{displayValue}</span>
            </span>
        );
    }

    return (
        <a
            href={href}
            aria-label={ariaLabel}
            className={cn("hover:text-accent transition-colors", className)}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
            <span>{displayValue}</span>
        </a>
    );
}
