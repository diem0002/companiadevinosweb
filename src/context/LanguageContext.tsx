
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
        "nav.history": "HISTORIA",
        "nav.prices": "PRECIOS",
        "nav.location": "DONDE ESTAMOS",

        // Hero
        "hero.overline": "VINERÍA EN CONCORDIA",
        "hero.title": "EL ARTE DE BRINDAR",
        "hero.subtitle": "Descubrí etiquetas seleccionadas, bodegas de autor y la mejor atención personalizada en Entre Ríos.",
        "hero.cta.stock": "Consultar Stock",
        "hero.cta.catalog": "Ver Catálogo",

        // Features
        "feature.author.title": "ETIQUETAS DE AUTOR",
        "feature.author.desc": "Seleccionamos vinos únicos que cuentan una historia en cada copa.",
        "feature.sommelier.title": "ASESORAMIENTO PERSONALIZADO",
        "feature.sommelier.desc": "Te guiamos con pasión para que elijas el vino ideal para cada ocasión.",
        "feature.delivery.title": "ENVÍOS EN CONCORDIA",
        "feature.delivery.desc": "Llevamos tu selección a la puerta de tu casa con cuidado extremo.",

        // Story
        "story.identity": "NUESTRA IDENTIDAD",
        "story.title": "TRADICIÓN Y PASIÓN",
        "story.p1": "Con 20 años de trayectoria, nos apasiona conectar a cada cliente con su vino ideal. Ofrecemos miles de etiquetas y la más amplia variedad de vinos locales y nacionales, creando un verdadero espacio para los amantes del buen vivir.",
        "story.p2": "Nuestra cava en San Luis 1220 no es solo un local, es un punto de encuentro donde la calidad y la exclusividad se encuentran en cada botella.",
        "story.badge.curated": "CURADURÍA",
        "story.badge.curated.desc": "Catas mensuales y selección rigurosa.",
        "story.badge.excellence": "EXCELENCIA",
        "story.badge.excellence.desc": "Solo las mejores bodegas del país.",

        // Price
        "price.tag": "+500 ETIQUETAS",
        "price.title": "CONSULTÁ NUESTROS PRECIOS HOY",
        "price.desc": "Accedé a nuestra plataforma digital de precios. Siempre actualizada, directa y fácil de usar desde tu móvil.",
        "price.feature.stock": "Catálogo Completo",
        "price.feature.search": "Buscador por cepas",
        "price.feature.update": "Precios actualizados",
        "price.feature.whatsapp": "Link directo a WhatsApp",
        "price.cta": "Ir a Web de Precios",
        "price.app": "App De Precios",

        // Location
        "location.overline": "DONDE ESTAMOS",
        "location.title": "ENCONTRANOS EN EL CENTRO",
        "location.address.title": "DONDE ESTAMOS",
        "location.address": "San Luis 1220, Concordia, Entre Ríos",
        "location.hours.title": "HORARIOS",
        "location.hours": "Lun a Sáb: 9:00 - 13:00 y 17:00 - 22:00 | Dom: 10:00 - 13:00",
        "location.cta": "Abrir en Google Maps",

        // ReadyCTA
        "ready.title": "¿LISTO PARA UN BRINDIS?",
        "ready.desc": "Hacé tu pedido ahora o consultanos cualquier duda por WhatsApp. Estamos para asesorarte en Concordia.",
        "ready.cta": "PEDIR POR WHATSAPP",

        // Footer
        "footer.quote": "\"La vinería más exclusiva de Concordia. Pasión por las uvas, amor por el servicio.\"",
        "footer.menu": "MENÚ",
        "footer.contact": "CONTACTO",
        "footer.news": "NOVEDADES",
        "footer.news.desc": "Enterate de nuevos ingresos.",
        "footer.email.placeholder": "Tu e-mail",
        "footer.subscribe": "UNIRME",
        "footer.rights": "© 2026 Compañía de Vinos - Concordia, Entre Ríos.",
    },
    pt: {
        // Navbar
        "nav.history": "HISTÓRIA",
        "nav.prices": "PREÇOS",
        "nav.location": "ONDE ESTAMOS",

        // Hero
        "hero.overline": "VINERÍA EM CONCORDIA",
        "hero.title": "A ARTE DE BRINDAR",
        "hero.subtitle": "Descubra rótulos selecionados, vinícolas de autor e o melhor atendimento personalizado em Entre Ríos.",
        "hero.cta.stock": "Consultar Estoque",
        "hero.cta.catalog": "Ver Catálogo",

        // Features
        "feature.author.title": "RÓTULOS DE AUTOR",
        "feature.author.desc": "Selecionamos vinhos únicos que contam uma história em cada taça.",
        "feature.sommelier.title": "ATENDIMENTO PERSONALIZADO",
        "feature.sommelier.desc": "Guiamos você com paixão para escolher o vinho ideal para cada ocasião.",
        "feature.delivery.title": "ENTREGAS EM CONCORDIA",
        "feature.delivery.desc": "Levamos sua seleção até a porta da sua casa com extremo cuidado.",

        // Story
        "story.identity": "NOSSA IDENTIDADE",
        "story.title": "TRADIÇÃO E PAIXÃO",
        "story.p1": "Com 20 anos de trajetória, somos apaixonados por conectar cada cliente ao seu vinho ideal. Oferecemos milhares de rótulos e a mais ampla variedade de vinhos locais e nacionais, criando um verdadeiro espaço para os amantes do bem viver.",
        "story.p2": "Nossa adega na San Luis 1220 não é apenas um local, é um ponto de encontro onde qualidade e exclusividade se encontram em cada garrafa.",
        "story.badge.curated": "CURADORIA",
        "story.badge.curated.desc": "Degustações mensais e seleção rigorosa.",
        "story.badge.excellence": "EXCELÊNCIA",
        "story.badge.excellence.desc": "Apenas as melhores vinícolas do país.",

        // Price
        "price.tag": "+500 RÓTULOS",
        "price.title": "CONSULTE NOSSOS PREÇOS HOJE",
        "price.desc": "Acesse nossa plataforma digital de preços. Sempre atualizada, direta e fácil de usar do seu celular.",
        "price.feature.stock": "Catálogo Completo",
        "price.feature.search": "Busca por uvas",
        "price.feature.update": "Preços atualizados",
        "price.feature.whatsapp": "Link direto para WhatsApp",
        "price.cta": "Ir para Web de Preços",
        "price.app": "App De Preços",

        // Location
        "location.overline": "ONDE ESTAMOS",
        "location.title": "ENCONTRE-NOS NO CENTRO",
        "location.address.title": "ONDE ESTAMOS",
        "location.address": "San Luis 1220, Concordia, Entre Ríos",
        "location.hours.title": "HORÁRIOS",
        "location.hours": "Seg a Sáb: 9:00 - 13:00 e 17:00 - 22:00 | Dom: 10:00 - 13:00",
        "location.cta": "Abrir no Google Maps",

        // ReadyCTA
        "ready.title": "PRONTO PARA UM BRINDE?",
        "ready.desc": "Faça seu pedido agora ou consulte qualquer dúvida pelo WhatsApp. Estamos aqui para assessorá-lo em Concordia.",
        "ready.cta": "PEDIR PELO WHATSAPP",

        // Footer
        "footer.quote": "\"A vinería mais exclusiva de Concordia. Paixão pelas uvas, amor pelo serviço.\"",
        "footer.menu": "MENU",
        "footer.contact": "CONTATO",
        "footer.news": "NOVIDADES",
        "footer.news.desc": "Fique por dentro das novidades.",
        "footer.email.placeholder": "Seu e-mail",
        "footer.subscribe": "PARTICIPAR",
        "footer.rights": "© 2026 Compañía de Vinos - Concordia, Entre Ríos.",
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
