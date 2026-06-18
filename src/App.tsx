/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import { HeroBlock } from "./components/HeroBlock";
import { LegendBlock } from "./components/LegendBlock";
import { ConvergenceBlock } from "./components/ConvergenceBlock";
import { MusicWidget } from "./components/MusicWidget";

// Simple self-contained floating hearts background component
function FloatingHearts() {
  // Statically defined elements with random horizontal values to prevent hydration flickers
  const heartsData = [
    { id: 1, left: "8%", delay: "0s", scale: 0.6 },
    { id: 2, left: "24%", delay: "3s", scale: 0.9 },
    { id: 3, left: "45%", delay: "6s", scale: 0.5 },
    { id: 4, left: "67%", delay: "2s", scale: 1.1 },
    { id: 5, left: "82%", delay: "8s", scale: 0.7 },
    { id: 6, left: "15%", delay: "5s", scale: 0.8 },
    { id: 7, left: "38%", delay: "1s", scale: 1.2 },
    { id: 8, left: "55%", delay: "9s", scale: 0.6 },
    { id: 9, left: "73%", delay: "4s", scale: 0.7 },
    { id: 10, left: "91%", delay: "11s", scale: 1.0 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {heartsData.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-40px] text-romantic-red/10 animate-[floatUp_14s_infinite_linear]"
          style={{
            left: h.left,
            animationDelay: h.delay,
            transform: `scale(${h.scale})`,
          }}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const convergenceRef = useRef<HTMLDivElement>(null);

  const handleDiscover = () => {
    setIsRevealed(true);
    // Let state complete render, then smoothly scroll to convergence area
    setTimeout(() => {
      if (convergenceRef.current) {
        convergenceRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  const handleReset = () => {
    setIsRevealed(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="linen-paper min-h-screen relative overflow-x-hidden selection:bg-romantic-coral selection:text-white pb-24">
      {/* Decorative Floating Hearts Layer */}
      <FloatingHearts />

      {/* Aesthetic Header frame */}
      <header className="py-6 px-8 border-b border-romantic-dark/5 flex justify-between items-center relative z-20 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-romantic-red fill-romantic-red/20 animate-pulse" />
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] text-romantic-dark">
            Hilo Rojo
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-romantic-dark/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-serif italic text-xs">Para siempre Greg & Cris</span>
        </div>
      </header>

      {/* Main visual blocks */}
      <main className="relative flex flex-col items-center">
        {/* BLOCK 1: Hero Section */}
        <HeroBlock />

        {/* Continuous scroll hint chevron */}
        <div className="my-2 flex flex-col items-center text-romantic-dark/40 animate-bounce cursor-default py-4">
          <span className="font-sans text-[9px] uppercase tracking-widest mb-1 select-none">Sigue el Hilo</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* BLOCK 2: Legend & Footer ankle graphics */}
        <LegendBlock onDiscover={handleDiscover} scrollRatio={0} />

        {/* BLOCK 3: Convergence Point (Tú & Yo) anchor wrapper */}
        <div ref={convergenceRef} className="w-full scroll-mt-6">
          <ConvergenceBlock isRevealed={isRevealed} onReset={handleReset} />
        </div>
      </main>

      {/* Floating Retro synthesized Music player box */}
      <MusicWidget />

      {/* Subtle footer */}
      <footer className="mt-16 text-center text-[10px] tracking-widest text-romantic-dark/30 font-sans uppercase">
        © {new Date().getFullYear()} • Hecho con Amor para Greg & Cris
      </footer>
    </div>
  );
}
