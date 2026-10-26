import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import {
  Abril_Fatface,
  Archivo,
  Bangers,
  Caveat,
  DM_Sans,
  DM_Serif_Display,
  Instrument_Serif,
  Outfit,
  Patrick_Hand,
  Permanent_Marker,
  Rubik,
  Rubik_Spray_Paint,
} from "next/font/google";
import { ThemeProvider, themeScript } from "@/components/theme";
import "./globals.css";

// Default theme fonts are preloaded; the other styles' fonts load only when used.
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const abril = Abril_Fatface({ subsets: ["latin"], weight: "400", variable: "--font-abril", preload: false });
const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", preload: false });
const dmserif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-dmserif", preload: false });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", preload: false });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers", preload: false });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", preload: false });
const spray = Rubik_Spray_Paint({ subsets: ["latin"], weight: "400", variable: "--font-spray", preload: false });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker", preload: false });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", preload: false });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", preload: false });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick", preload: false });

const fontVars = [GeistSans, GeistMono, instrument, abril, dmsans, dmserif, outfit, bangers, archivo, spray, marker, rubik, caveat, patrick]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Taha Umar · Lead AI/ML Engineer",
  description:
    "Lead AI/ML Engineer building multi-agent systems, RAG and LLMOps that hold up in production. LangGraph, MCP, hybrid retrieval, evals and tracing.",
  openGraph: {
    title: "Taha Umar · Lead AI/ML Engineer",
    description: "I build AI agents that hold up in production.",
    images: ["/taha.png"],
  },
};

export const viewport: Viewport = { themeColor: "#0d0d0c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="studio" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-dvh font-sans">
        {/* Filter used by the handwritten style for wobbly, hand-drawn lines */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="3.5" />
          </filter>
        </svg>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
