"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "pt";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
    es: {
        // Accesibilidad
        "a11y.skip": "Saltar al contenido principal",
        "a11y.nav.primary": "Principal",
        "a11y.menu.toggle": "Abrir o cerrar menú de navegación",
        "a11y.lang.es": "Cambiar idioma a Español",
        "a11y.lang.pt": "Cambiar idioma a Portugués",
        "a11y.video.pause": "Pausar animación de fondo",
        "a11y.video.play": "Reproducir animación de fondo",
        "a11y.social.instagram": "Visitar Instagram de Compañía de Vinos",
        "a11y.social.facebook": "Visitar Facebook de Compañía de Vinos",
        "a11y.whatsapp.float": "Escribir por WhatsApp a Compañía de Vinos",

        // Navbar
        "nav.categories": "QUÉ OFRECEMOS",
        "nav.history": "TRADICIÓN",
        "nav.gallery": "NUESTRO ESPACIO",
        "nav.location": "DÓNDE ESTAMOS",
        "nav.whatsapp": "WHATSAPP",

        // Hero
        "hero.overline": "VINERÍA & BOUTIQUE DE BEBIDAS · CONCORDIA",
        "hero.title.line1": "EL ARTE DE",
        "hero.title.accent": "BRINDAR",
        "hero.subtitle": "Gran variedad de vinos y cepas, whiskies, licores, cervezas importadas, cristalería, copas y regalería empresarial. Asesoramiento personalizado en San Luis 1220.",
        "hero.cta.whatsapp": "Consultar por WhatsApp",
        "hero.cta.explore": "Descubrir Nuestro Espacio",
        "hero.badge.years": "+20 Años en Concordia",
        "hero.badge.selection": "Vinos · Destilados · Cristalería · Regalos",

        // Features (Categorías del local)
        "features.overline": "TODO PARA EL BUEN BEBER",
        "features.title.line1": "NUESTRA",
        "features.title.accent": "PROPUESTA",
        "features.subtitle": "Mucho más que una vinería: reunimos etiquetas consagradas, destilados del mundo, cristalería fina y presentes inolvidables.",

        "feature.wines.title": "VINOS Y CEPAS SELECCIONADAS",
        "feature.wines.desc": "Amplia variedad de etiquetas de autor, grandes reservas, bodegas boutique y clásicos nacionales en todas las cepas.",
        "feature.spirits.title": "WHISKIES, LICORES Y CERVEZAS IMPORTADAS",
        "feature.spirits.desc": "Destilados internacionales, whiskies de malta, aperitivos, espumantes y una cuidada selección de cervezas importadas.",
        "feature.glassware.title": "CRISTALERÍA, COPAS Y ACCESORIOS",
        "feature.glassware.desc": "Copas de degustación, decantadores, aireadores, sacacorchos y accesorios pensados para realzar cada descorche.",
        "feature.gifts.title": "REGALERÍA Y ATENCIÓN A MEDIDA",
        "feature.gifts.desc": "Estuches exclusivos, regalos empresariales y asesoramiento personalizado para tus eventos, cenas o celebraciones.",

        // Story (Tradición y Pasión)
        "story.identity": "NUESTRA IDENTIDAD",
        "story.title.line1": "TRADICIÓN Y",
        "story.title.accent": "PASIÓN",
        "story.p1": "Con más de 20 años de trayectoria en Concordia, nos apasiona conectar a cada cliente con la botella o el regalo ideal. Contamos con miles de etiquetas de vinos en distintas cepas, además de whiskies, licores, cervezas importadas, cristalería, copas y accesorios.",
        "story.p2": "Nuestro espacio en San Luis 1220 es un punto de encuentro donde la calidez en la atención y la diversidad de nuestra cava se unen para que siempre encuentres exactamente lo que buscás.",
        "story.card1.title": "VARIEDAD DE CEPAS Y BODEGAS",
        "story.card1.desc": "Desde Malbec de altura, Cabernet Franc y Petit Verdot hasta blends de guarda y espumantes.",
        "story.card2.title": "DESTILADOS Y CERVEZAS DEL MUNDO",
        "story.card2.desc": "Whiskies, gins, licores finos y cervezas importadas seleccionadas para paladares exigentes.",
        "story.card3.title": "COPAS, CRISTALERÍA Y REGALERÍA",
        "story.card3.desc": "Sets de regalo en estuche, copas de cristal, aireadores y accesorios para obsequiar con distinción.",
        "story.card4.title": "ASESORAMIENTO DIRECTO",
        "story.card4.desc": "Escribinos por WhatsApp y te guiamos al instante según tu comida, evento o presupuesto.",
        "story.cta": "Pedir Recomendación por WhatsApp",

        // Gallery (Nuestro Espacio)
        "gallery.overline": "RECORRIDO VISUAL",
        "gallery.title.line1": "NUESTRA CAVA Y",
        "gallery.title.accent": "SELECCIÓN",
        "gallery.subtitle": "Conocé por dentro nuestras estanterías de roble, etiquetas de colección y sets de regalería listos para sorprender.",
        "gallery.item1.tag": "CAVA DE GUARDA",
        "gallery.item1.title": "Grandes Reservas & Líneas Icono",
        "gallery.item1.desc": "Etiquetas consagradas de las mejores regiones vitivinícolas argentinas.",
        "gallery.item2.tag": "ETIQUETAS DE AUTOR",
        "gallery.item2.title": "Partidas Limitadas & Single Vineyards",
        "gallery.item2.desc": "Joyas enológicas y cepas seleccionadas que cuentan una historia única.",
        "gallery.item3.tag": "REGALERÍA & CRISTALERÍA",
        "gallery.item3.title": "Estuches con Copas y Accesorios",
        "gallery.item3.desc": "Presentaciones listas para regalar con copas de cristal y accesorios de servicio.",
        "gallery.item4.tag": "COLECCIONES ESPECIALES",
        "gallery.item4.title": "Variedad de Cepas y Estilos",
        "gallery.item4.desc": "Malbec, Cabernet Sauvignon, Red Blends y etiquetas para cada ocasión.",
        "gallery.item5.tag": "ESTANTERÍA PRINCIPAL",
        "gallery.item5.title": "Miles de Etiquetas en Stock",
        "gallery.item5.desc": "Vinos, espumantes, whiskies, licores y cervezas importadas en nuestro local.",
        "gallery.cta": "Consultar disponibilidad por WhatsApp",

        // Location (Dónde Estamos + Frente del Local)
        "location.overline": "VISITANOS EN CONCORDIA",
        "location.title.line1": "TU PUNTO DE",
        "location.title.accent": "ENCUENTRO",
        "location.facade.badge": "NUESTRO LOCAL EN SAN LUIS 1220",
        "location.facade.caption": "Acercate a conocer nuestra cava o hacé tu pedido por WhatsApp para retirar o recibir en Concordia.",
        "location.address.title": "DIRECCIÓN",
        "location.address": "San Luis 1220, Concordia, Entre Ríos",
        "location.hours.title": "HORARIOS DE ATENCIÓN",
        "location.hours": "Lunes a Sábados: 9:00 a 13:00 y 17:00 a 22:00 | Domingos: 10:00 a 13:00",
        "location.cta.maps": "Cómo llegar en Google Maps",
        "location.cta.whatsapp": "Escribir al WhatsApp del Local",

        // ReadyCTA
        "ready.overline": "ATENCIÓN INMEDIATA Y PERSONALIZADA",
        "ready.title.line1": "¿BUSCÁS UN VINO O UN",
        "ready.title.accent": "REGALO ESPECIAL?",
        "ready.desc": "Escribinos directo por WhatsApp. Te asesoramos sobre vinos, cepas, whiskies, licores, cervezas importadas, cristalería y armamos tu pedido o regalo al instante.",
        "ready.cta": "ESCRIBIR POR WHATSAPP AHORA",
        "ready.whatsapp.message": "¡Hola Compañía de Vinos! Quisiera recibir asesoramiento y consultar por sus productos.",

        // Footer
        "footer.quote": "\"La vinería más completa de Concordia. Vinos de autor, destilados, cristalería y pasión por el buen servicio.\"",
        "footer.menu": "NAVEGACIÓN",
        "footer.contact": "CONTACTO DIRECTO",
        "footer.rights": "© 2026 Compañía de Vinos · San Luis 1220, Concordia, Entre Ríos.",
    },
    pt: {
        // Accesibilidad
        "a11y.skip": "Pular para o conteúdo principal",
        "a11y.nav.primary": "Principal",
        "a11y.menu.toggle": "Abrir ou fechar menu de navegação",
        "a11y.lang.es": "Mudar idioma para Espanhol",
        "a11y.lang.pt": "Mudar idioma para Português",
        "a11y.video.pause": "Pausar animação de fundo",
        "a11y.video.play": "Reproduzir animação de fundo",
        "a11y.social.instagram": "Visitar Instagram da Compañía de Vinos",
        "a11y.social.facebook": "Visitar Facebook da Compañía de Vinos",
        "a11y.whatsapp.float": "Conversar pelo WhatsApp com a Compañía de Vinos",

        // Navbar
        "nav.categories": "O QUE OFERECEMOS",
        "nav.history": "TRADIÇÃO",
        "nav.gallery": "NOSSO ESPAÇO",
        "nav.location": "ONDE ESTAMOS",
        "nav.whatsapp": "WHATSAPP",

        // Hero
        "hero.overline": "VINERÍA & BOUTIQUE DE BEBIDAS · CONCORDIA",
        "hero.title.line1": "A ARTE DE",
        "hero.title.accent": "BRINDAR",
        "hero.subtitle": "Grande variedade de vinhos e uvas, whiskies, licores, cervejas importadas, cristaleria, taças e presentes. Atendimento personalizado na San Luis 1220.",
        "hero.cta.whatsapp": "Consultar pelo WhatsApp",
        "hero.cta.explore": "Conhecer Nosso Espaço",
        "hero.badge.years": "+20 Anos em Concordia",
        "hero.badge.selection": "Vinhos · Destilados · Cristaleria · Presentes",

        // Features
        "features.overline": "TUDO PARA O BOM BEBER",
        "features.title.line1": "NOSSA",
        "features.title.accent": "PROPOSTA",
        "features.subtitle": "Muito mais que uma adega: reunimos rótulos consagrados, destilados do mundo, cristaleria fina e presentes inesquecíveis.",

        "feature.wines.title": "VINHOS E UVAS SELECIONADAS",
        "feature.wines.desc": "Ampla variedade de rótulos de autor, grandes reservas, vinícolas boutique e clássicos argentinos em todas as uvas.",
        "feature.spirits.title": "WHISKIES, LICORES E CERVEJAS IMPORTADAS",
        "feature.spirits.desc": "Destilados internacionais, whiskies, aperitivos, espumantes e uma seleção especial de cervejas importadas.",
        "feature.glassware.title": "CRISTALERIA, TAÇAS E ACESSÓRIOS",
        "feature.glassware.desc": "Taças de degustação, decantadores, aeradores, saca-rolhas e acessórios pensados para valorizar cada garrafa.",
        "feature.gifts.title": "PRESENTES E ATENDIMENTO PERSONALIZADO",
        "feature.gifts.desc": "Kits exclusivos, presentes corporativos e assessoria direta para seus eventos, jantares ou celebrações.",

        // Story
        "story.identity": "NOSSA IDENTIDADE",
        "story.title.line1": "TRADIÇÃO E",
        "story.title.accent": "PAIXÃO",
        "story.p1": "Com mais de 20 anos de trajetória em Concordia, somos apaixonados por conectar cada cliente à garrafa ou ao presente ideal. Oferecemos milhares de rótulos de vinhos de diferentes uvas, além de whiskies, licores, cervejas importadas, cristaleria, taças e acessórios.",
        "story.p2": "Nossa loja na San Luis 1220 é um ponto de encontro onde o atendimento próximo e a diversidade da nossa adega se unem para que você encontre sempre o que procura.",
        "story.card1.title": "VARIEDADE DE UVAS E VINÍCOLAS",
        "story.card1.desc": "De Malbec de altitude, Cabernet Franc e Petit Verdot até blends de guarda e espumantes.",
        "story.card2.title": "DESTILADOS E CERVEJAS DO MUNDO",
        "story.card2.desc": "Whiskies, gins, licores finos e cervejas importadas selecionadas para paladares exigentes.",
        "story.card3.title": "TAÇAS, CRISTALERIA E PRESENTES",
        "story.card3.desc": "Kits para presente em estojo, taças de cristal, aeradores e acessórios sofisticados.",
        "story.card4.title": "ASSESSORIA DIRETA",
        "story.card4.desc": "Chame no WhatsApp e orientamos você na hora conforme seu prato, evento ou orçamento.",
        "story.cta": "Pedir Recomendação no WhatsApp",

        // Gallery
        "gallery.overline": "TOUR VISUAL",
        "gallery.title.line1": "NOSSA ADEGA E",
        "gallery.title.accent": "SELEÇÃO",
        "gallery.subtitle": "Conheça por dentro nossas estantes de carvalho, rótulos de coleção e kits de presente prontos para surpreender.",
        "gallery.item1.tag": "ADEGA DE GUARDA",
        "gallery.item1.title": "Grandes Reservas & Linhas Ícone",
        "gallery.item1.desc": "Rótulos consagrados das melhores regiões vinícolas da Argentina.",
        "gallery.item2.tag": "RÓTULOS DE AUTOR",
        "gallery.item2.title": "Edições Limitadas & Single Vineyards",
        "gallery.item2.desc": "Joias enológicas e uvas selecionadas que contam uma história única.",
        "gallery.item3.tag": "PRESENTES & CRISTALERIA",
        "gallery.item3.title": "Estojos com Taças e Acessórios",
        "gallery.item3.desc": "Apresentações prontas para presentear com taças de cristal e acessórios.",
        "gallery.item4.tag": "COLEÇÕES ESPECIAIS",
        "gallery.item4.title": "Variedade de Uvas e Estilos",
        "gallery.item4.desc": "Malbec, Cabernet Sauvignon, Red Blends e rótulos para cada ocasião.",
        "gallery.item5.tag": "ESTANTE PRINCIPAL",
        "gallery.item5.title": "Milhares de Rótulos em Estoque",
        "gallery.item5.desc": "Vinhos, espumantes, whiskies, licores e cervejas importadas em nossa loja.",
        "gallery.cta": "Consultar disponibilidade pelo WhatsApp",

        // Location
        "location.overline": "VISITE-NOS EM CONCORDIA",
        "location.title.line1": "SEU PONTO DE",
        "location.title.accent": "ENCONTRO",
        "location.facade.badge": "NOSSA LOJA NA SAN LUIS 1220",
        "location.facade.caption": "Venha conhecer nossa adega pessoalmente ou faça seu pedido pelo WhatsApp.",
        "location.address.title": "ENDEREÇO",
        "location.address": "San Luis 1220, Concordia, Entre Ríos",
        "location.hours.title": "HORÁRIOS DE ATENDIMENTO",
        "location.hours": "Seg a Sáb: 9:00 às 13:00 e 17:00 às 22:00 | Dom: 10:00 às 13:00",
        "location.cta.maps": "Como chegar pelo Google Maps",
        "location.cta.whatsapp": "Falar no WhatsApp da Loja",

        // ReadyCTA
        "ready.overline": "ATENDIMENTO IMEDIATO E PERSONALIZADO",
        "ready.title.line1": "PROCURA UM VINHO OU UM",
        "ready.title.accent": "PRESENTE ESPECIAL?",
        "ready.desc": "Fale conosco direto pelo WhatsApp. Orientamos você sobre vinhos, uvas, whiskies, licores, cervejas importadas, cristaleria e preparamos seu pedido na hora.",
        "ready.cta": "CHAMAR NO WHATSAPP AGORA",
        "ready.whatsapp.message": "Olá Compañía de Vinos! Gostaria de receber atendimento e consultar sobre seus produtos.",

        // Footer
        "footer.quote": "\"A vinería mais completa de Concordia. Vinhos de autor, destilados, cristaleria e paixão pelo bom atendimento.\"",
        "footer.menu": "NAVEGAÇÃO",
        "footer.contact": "CONTATO DIRETO",
        "footer.rights": "© 2026 Compañía de Vinos · San Luis 1220, Concordia, Entre Ríos.",
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("es");

    // Synchronize document language attribute for assistive technologies (accessibility guide WCAG 3.1.1)
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string) => {
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
