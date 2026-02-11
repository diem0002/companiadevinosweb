
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { PriceSection } from "@/components/sections/PriceSection";
import { Story } from "@/components/sections/Story";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
    return (
        <div className="flex flex-col gap-12 sm:gap-24">
            <Hero />
            <Features />
            <Story />
            <PriceSection />
            <Location />
            <Footer />
        </div>
    );
}
