import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-display",
});

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

export const viewport: Viewport = { themeColor: "#09090b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body className="grain min-h-dvh font-sans">{children}</body>
    </html>
  );
}
