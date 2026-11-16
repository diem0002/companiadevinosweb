import { DrinkCalculator } from "@/components/sections/DrinkCalculator";
import { Features } from "@/components/sections/Features";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { ReadyCTA } from "@/components/sections/ReadyCTA";
import { Story } from "@/components/sections/Story";
import { WineryMarquee } from "@/components/sections/WineryMarquee";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <Features />
            <Story />
            <Gallery />
            <DrinkCalculator />
            <ReadyCTA />
            <Location />
            <WineryMarquee />
        </div>
    );
}
