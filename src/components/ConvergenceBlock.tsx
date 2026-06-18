import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimeCounter } from "./TimeCounter";

interface ConvergenceBlockProps {
  isRevealed: boolean;
  onReset: () => void;
}

export function ConvergenceBlock({ isRevealed, onReset }: ConvergenceBlockProps) {
  const [triggerHeart, setTriggerHeart] = useState(false);

  // Trigger heart bounce animation slightly after the circles slide and overlap
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setTriggerHeart(true);
      }, 1100); // Wait for the 1-second slide animation to settle
      return () => clearTimeout(timer);
    } else {
      setTriggerHeart(false);
    }
  }, [isRevealed]);

  return (
    <section
      id="convergence-block"
      className="relative py-20 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 overflow-hidden min-h-[80vh] z-10"
    >
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full flex flex-col items-center space-y-12"
          >
            {/* Header section */}
            <div className="text-center space-y-3">
              <motion.span
                initial={{ opacity: 0, tracking: "0.1em" }}
                animate={{ opacity: 0.6, tracking: "0.3em" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-[10px] text-romantic-dark uppercase block"
              >
                Destinados a Coincidir
              </motion.span>
              <motion.h2
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-serif italic text-3xl md:text-4xl text-romantic-dark"
              >
                El Instante de la Convergencia
              </motion.h2>
              <div className="w-12 h-[1px] bg-romantic-red/40 mx-auto mt-2" />
            </div>

            {/* Venn Intersection Playground - Responsive Interactive Stage */}
            <div className="relative w-full max-w-md h-72 flex items-center justify-center select-none">
              
              {/* Outer decorative sketch glow behind circles */}
              {triggerHeart && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.15, scale: 1.1 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute w-44 h-44 rounded-full bg-romantic-red/50 blur-3xl pointer-events-none"
                />
              )}

              {/* Venn diagram representation */}
              <div className="relative w-full h-full flex items-center justify-center">

                {/* Left Circle: "TÚ" */}
                <motion.div
                  initial={{ x: -160, opacity: 0 }}
                  animate={{ x: -44, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    type: "spring",
                    stiffness: 45,
                    damping: 12,
                    delay: 0.2,
                  }}
                  className="absolute w-44 h-44 rounded-full flex items-center justify-center text-romantic-dark"
                >
                  {/* Textured sketchy brush outline SVG */}
                  <svg className="absolute inset-0 w-full h-full text-romantic-dark/85" viewBox="0 0 100 100">
                    <path
                      d="M 50 4 C 75 4, 96 25, 96 50 C 96 75, 75 96, 50 96 C 25 96, 4 75, 4 50 C 4 25, 25 4, 50 4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="4 2 20 4 8 2"
                      className="opacity-75"
                    />
                    <path
                      d="M 52 6 C 72 3, 94 22, 94 48 C 94 74, 73 94, 48 94 C 23 94, 6 73, 6 48 C 6 23, 27 6, 52 6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Inner text */}
                  <span className="font-sans font-medium text-lg tracking-[0.2em] relative z-10 mr-4">
                    TÚ
                  </span>
                </motion.div>

                {/* Right Circle: "YO" */}
                <motion.div
                  initial={{ x: 160, opacity: 0 }}
                  animate={{ x: 44, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    type: "spring",
                    stiffness: 45,
                    damping: 12,
                    delay: 0.2,
                  }}
                  className="absolute w-44 h-44 rounded-full flex items-center justify-center text-romantic-dark"
                >
                  {/* Textured sketchy brush outline SVG */}
                  <svg className="absolute inset-0 w-full h-full text-romantic-dark/85" viewBox="0 0 100 100">
                    <path
                      d="M 50 4 C 25 4, 4 25, 4 50 C 4 75, 25 96, 50 96 C 75 96, 96 75, 96 50 C 96 25, 75 4, 50 4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="5 3 25 5 10 3"
                      className="opacity-75"
                    />
                    <path
                      d="M 48 6 C 28 3, 6 22, 6 48 C 6 74, 27 94, 52 94 C 77 94, 94 73, 94 48 C 94 23, 73 6, 48 6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Inner text */}
                  <span className="font-sans font-medium text-lg tracking-[0.2em] relative z-10 ml-4">
                    YO
                  </span>
                </motion.div>

                {/* Overlap & Elastic Bouncing Heart at visual midpoint */}
                <AnimatePresence>
                  {triggerHeart && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 10,  // Springy and bouncy!
                        mass: 0.8,
                      }}
                      className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
                    >
                      {/* Heart Icon with gentle scaling effect */}
                      <motion.svg
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-18 h-18 text-romantic-red filter drop-shadow-[0_4px_12px_rgba(211,47,47,0.45)]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </motion.svg>
                      
                      {/* Elegant overlap ampersand */}
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute font-sans font-extralight text-xl text-white select-none mt-[-2px]"
                      >
                        &
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Time Counter component - reveals since March 18, 2022 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-full"
            >
              <TimeCounter />
            </motion.div>

            {/* Reset / Replay Interactive Control */}
            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-sans text-[11px] tracking-[0.2em] text-romantic-dark/40 hover:text-romantic-dark/80 uppercase px-4 py-2 border border-transparent hover:border-romantic-dark/20 rounded-full transition-all duration-300 pointer-events-auto"
            >
              ↺ Reiniciar Transición
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
