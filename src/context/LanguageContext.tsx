
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "pt";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
    es: {
        // Navbar
        "nav.history": "Historia",
        "nav.prices": "Precios",
        "nav.location": "Ubicación",

        // Hero
        "hero.title": "EL ARTE DE BRINDAR",
        "hero.subtitle": "Vinería Premium en Concordia",
        "hero.cta.whatsapp": "Contactar por WhatsApp",
        "hero.cta.catalog": "Ver Catálogo",

        // Features
        "feature.curated.title": "Curaduría Exclusiva",
        "feature.curated.desc": "Selección de etiquetas premium.",
        "feature.sommelier.title": "Atención Sommelier",
        "feature.sommelier.desc": "Asesoramiento experto.",
        "feature.delivery.title": "Envíos Locales",
        "feature.delivery.desc": "Entrega en Concordia.",

        // Story
        "story.title": "Tradición y Pasión",
        "story.content": "Ubicados en el corazón de Concordia, Compañía de Vinos no es solo una vinería, es un punto de encuentro para los amantes del buen vivir.",

        // Price
        "price.title": "Consulta Nuestros Precios",
        "price.desc": "Accede a nuestra lista actualizada al instante.",
        "price.cta": "Ver Precios Online",

        // Location
        "location.title": "Visítanos",
        "location.address": "San Luis 1220, Concordia, Entre Ríos",
        "location.hours": "Luny a Sábado: 9:00 - 13:00 / 17:00 - 21:00",

        // Footer
        "footer.subscribe": "Suscríbete a novedades",
        "footer.rights": "© 2024 Compañía de Vinos. Todos los derechos reservados.",
    },
    pt: {
        // Navbar
        "nav.history": "História",
        "nav.prices": "Preços",
        "nav.location": "Localização",

        // Hero
        "hero.title": "A ARTE DE BRINDAR",
        "hero.subtitle": "Vinería Premium em Concordia",
        "hero.cta.whatsapp": "Contato WhatsApp",
        "hero.cta.catalog": "Ver Catálogo",

        // Features
        "feature.curated.title": "Curadoria Exclusiva",
        "feature.curated.desc": "Seleção de rótulos premium.",
        "feature.sommelier.title": "Atendimento Sommelier",
        "feature.sommelier.desc": "Assessoria especializada.",
        "feature.delivery.title": "Entregas Locais",
        "feature.delivery.desc": "Entrega em Concordia.",

        // Story
        "story.title": "Tradição e Paixão",
        "story.content": "Localizados no coração de Concordia, Compañía de Vinos não é apenas uma vinería, é um ponto de encontro para os amantes do bem viver.",

        // Price
        "price.title": "Consulte Nossos Preços",
        "price.desc": "Acesse nossa lista atualizada instantaneamente.",
        "price.cta": "Ver Preços Online",

        // Location
        "location.title": "Visite-nos",
        "location.address": "San Luis 1220, Concordia, Entre Ríos",
        "location.hours": "Seg a Sáb: 9:00 - 13:00 / 17:00 - 21:00",

        // Footer
        "footer.subscribe": "Inscreva-se para novidades",
        "footer.rights": "© 2024 Compañía de Vinos. Todos os direitos reservados.",
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("es");

    const t = (key: string) => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
