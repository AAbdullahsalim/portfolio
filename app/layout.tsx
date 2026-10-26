import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Archivo, Bangers, Caveat, Instrument_Serif, Patrick_Hand } from "next/font/google";
import { ThemeProvider, themeScript } from "@/components/theme";
import "./globals.css";

// All style fonts load up front, since the style can change while you scroll.
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-patrick" });

const fontVars = [GeistSans, GeistMono, instrument, bangers, archivo, caveat, patrick]
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
