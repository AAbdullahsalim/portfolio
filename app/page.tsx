import About from "@/components/About";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import { Availability, Contact, Footer, Process, Services, Stack } from "@/components/Sections";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {/* The hero stays pinned; everything below slides up over it */}
        <div className="relative">
          <Hero />
          <div className="relative z-10 rounded-t-[2rem] bg-bg shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.8)] ring-1 ring-border">
            <About />
            <Work />
            <Services />
            <Process />
            <Stack />
            <div className="py-6">
              <Availability />
            </div>
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
