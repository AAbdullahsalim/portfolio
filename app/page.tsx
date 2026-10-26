import About from "@/components/About";
import Backdrop from "@/components/Backdrop";
import Experience from "@/components/Experience";
import Hero, { HeroStage } from "@/components/Hero";
import Nav from "@/components/Nav";
import SectionRail from "@/components/SectionRail";
import { Availability, Contact, Footer, Process, Services, Stack } from "@/components/Sections";
import Story from "@/components/Story";
import { StyleWheel } from "@/components/theme";
import { PopAbout, PopContact, PopFooter, PopHero, PopProcess, PopServices, PopStack } from "@/components/variants/Pop";
import { SketchAbout, SketchContact, SketchFooter, SketchHero, SketchProcess, SketchServices, SketchStack } from "@/components/variants/Sketch";
import Work from "@/components/Work";

/** One section, three layouts. CSS shows the one for the active style. */
function Variant({ id, studio, pop, sketch }: { id?: string; studio: React.ReactNode; pop: React.ReactNode; sketch: React.ReactNode }) {
  return (
    <div id={id} data-section={id} className="relative scroll-mt-20">
      <div className="v-studio">{studio}</div>
      <div className="v-pop">{pop}</div>
      <div className="v-sketch">{sketch}</div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg">
        Skip to content
      </a>
      <Nav />
      <SectionRail />
      <StyleWheel />
      <main id="main">
        {/* The hero stays pinned; everything below slides up over it */}
        <div id="top" data-section="top" className="relative scroll-mt-0">
          <HeroStage>
            <div className="v-studio h-full"><Hero /></div>
            <div className="v-pop h-full"><PopHero /></div>
            <div className="v-sketch h-full"><SketchHero /></div>
          </HeroStage>
          <div className="page-surface relative z-10 rounded-t-[2rem] shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.5)] ring-1 ring-border">
            <Backdrop />
            <Variant id="about" studio={<About />} pop={<PopAbout />} sketch={<SketchAbout />} />
            <Experience />
            <Story />
            <Work />
            <Variant id="services" studio={<Services />} pop={<PopServices />} sketch={<SketchServices />} />
            <Variant id="process" studio={<Process />} pop={<PopProcess />} sketch={<SketchProcess />} />
            <Variant id="stack" studio={<Stack />} pop={<PopStack />} sketch={<SketchStack />} />
            <div className="py-6">
              <Availability />
            </div>
            <Variant id="contact" studio={<Contact />} pop={<PopContact />} sketch={<SketchContact />} />
            <Variant studio={<Footer />} pop={<PopFooter />} sketch={<SketchFooter />} />
          </div>
        </div>
      </main>
    </>
  );
}
