
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { PriceSection } from "@/components/sections/PriceSection";
import { ReadyCTA } from "@/components/sections/ReadyCTA";
import { Story } from "@/components/sections/Story";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <Features />
            <Story />
            <PriceSection />
            <ReadyCTA />
            <Location />
            <Footer />
        </div>
    );
}
