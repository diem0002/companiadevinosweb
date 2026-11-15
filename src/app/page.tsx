import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { ReadyCTA } from "@/components/sections/ReadyCTA";
import { Story } from "@/components/sections/Story";
import { Gallery } from "@/components/sections/Gallery";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <Features />
            <Story />
            <Gallery />
            <ReadyCTA />
            <Location />
        </div>
    );
}
