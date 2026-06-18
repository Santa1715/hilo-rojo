import React from "react";

export function FloralFlourish() {
  return (
    <div id="floral-flourish" className="flex justify-center items-center py-4 opacity-75">
      <svg
        className="w-48 h-12 text-romantic-dark pointer-events-none"
        viewBox="0 0 200 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left scroll / leaf wing */}
        <path d="M100 25 C75 25, 60 5, 40 25 C25 45, 15 25, 5 25" />
        <path d="M40 25 C45 15, 55 15, 60 5" />
        <path d="M25 45 C30 35, 35 35, 40 25" />
        
        {/* Tiny leaf extensions left */}
        <path d="M48 20 C45 18, 43 20, 41 23" fill="currentColor" />
        <path d="M30 38 C28 35, 29 32, 32 31" fill="currentColor" />

        {/* Center Rose Bud / Ornament */}
        <circle cx="100" cy="25" r="4" fill="var(--color-romantic-red)" stroke="var(--color-romantic-red)" />
        <path d="M100 15 C100 10, 96 12, 100 21" />
        <path d="M100 15 C100 10, 104 12, 100 21" />
        <path d="M100 29 C100 34, 96 32, 100 29" />
        
        {/* Right scroll / leaf wing (Mirror of left) */}
        <path d="M100 25 C125 25, 140 5, 160 25 C175 45, 185 25, 195 25" />
        <path d="M160 25 C155 15, 145 15, 140 5" />
        <path d="M175 45 C170 35, 165 35, 160 25" />
        
        {/* Tiny leaf extensions right */}
        <path d="M152 20 C155 18, 157 20, 159 23" fill="currentColor" />
        <path d="M170 38 C172 35, 171 32, 168 31" fill="currentColor" />
      </svg>
    </div>
  );
}

export function HeartSpark({ delay = 0 }) {
  return (
    <svg
      className="absolute text-romantic-red animate-pulse pointer-events-none"
      style={{ animationDelay: `${delay}s`, animationDuration: "2s" }}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
