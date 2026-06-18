import React from "react";
import { motion } from "motion/react";
import { FloralFlourish } from "./Ornament";

const coupleImg = "/src/assets/images/romantic_couple_1781803080507.jpg";

export function HeroBlock() {
  return (
    <section id="hero-block" className="relative flex flex-col items-center justify-center pt-16 pb-12 px-6 w-full max-w-4xl mx-auto text-center z-10">
      {/* 1. Ornament o Floritura minimalista superior */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <FloralFlourish />
      </motion.div>

      {/* 2. Fecha principal con espaciado amplio */}
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.05em" }}
        animate={{ opacity: 1, letterSpacing: "0.25em" }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="mt-6 font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] text-romantic-dark/70 uppercase"
      >
        18 / 03 / 2022
      </motion.div>

      {/* Decorative subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="text-xs italic text-romantic-dark mt-2 tracking-wide font-serif"
      >
        Donde nuestros caminos se unieron para siempre.
      </motion.p>

      {/* 3. Card Polaroid con foto romántica y texto inferior */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
        whileHover={{ scale: 1.03, rotate: 1, transition: { duration: 0.3 } }}
        transition={{ duration: 1.2, delay: 0.8, type: "spring" }}
        className="mt-12 bg-white p-5 pb-8 rounded-sm shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] border border-neutral-100 max-w-sm w-full mx-auto"
      >
        {/* Simulates a sticky piece of retro tape on top */}
        <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-50/40 border border-amber-100/30 backdrop-blur-[1px] rotate-1 flex items-center justify-center text-[10px] tracking-widest text-romantic-dark/50 font-sans shadow-2xs pointer-events-none">
          ♥ RECUERDO ♥
        </div>

        {/* Polaroid Picture Container with 1:1 Aspect Ratio constraint */}
        <div className="relative w-full aspect-square bg-neutral-50 overflow-hidden border border-neutral-100 rounded-xs group">
          <img
            src={coupleImg}
            alt="Greg & Cris original"
            className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle warm photo overlay grading */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
        </div>

        {/* Polaroid Signature bottom text: Greg & Cris with coral ampersand */}
        <div className="mt-6 text-center select-none">
          <h1 className="font-cursive text-5xl text-romantic-dark tracking-normal">
            Greg <span className="font-sans font-extralight text-3xl mx-1 text-romantic-coral hover:scale-110 inline-block transition-transform duration-300">&</span> Cris
          </h1>
          <p className="font-sans text-[10px] tracking-[0.15em] text-neutral-400 uppercase mt-2">
            NUESTRO ANIVERSARIO
          </p>
        </div>
      </motion.div>
    </section>
  );
}
