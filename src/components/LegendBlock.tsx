import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface LegendBlockProps {
  onDiscover: () => void;
  scrollRatio: number; // passed from parent or calculated locally
}

export function LegendBlock({ onDiscover }: LegendBlockProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [localRatio, setLocalRatio] = useState(0);

  // Calculate local ratio of scroll specifically within this section for precision drawing
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !pathRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is scrolled into viewport
      const startTrigger = rect.top - windowHeight;
      const totalScrollableDist = rect.height + windowHeight;
      const scrolledDist = -startTrigger;
      
      let ratio = scrolledDist / totalScrollableDist;
      ratio = Math.max(0, Math.min(1, ratio)); // Clamp between 0 and 1
      
      setLocalRatio(ratio);
      
      // Draw SVG progressively
      const pathLength = pathRef.current.getTotalLength();
      if (pathLength > 0) {
        pathRef.current.style.strokeDasharray = `${pathLength}`;
        // At ratio 0, offset is full length (invisible). At ratio 1, offset is 0 (fully drawn).
        pathRef.current.style.strokeDashoffset = `${pathLength * (1 - ratio)}`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="legend-block"
      className="relative py-24 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 z-10 overflow-visible"
    >
      {/* Dynamic Red Thread SVG drawing progressively */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-48 pointer-events-none z-0">
        <svg
          className="w-full h-full text-romantic-red opacity-85"
          viewBox="0 0 200 800"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Main path traversing from top of poem down through the poem and looping */}
          <path
            ref={pathRef}
            d="M 100 0 
               C 100 150, 40 200, 40 300 
               C 40 450, 160 380, 160 500 
               C 160 620, 110 650, 100 800"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{
              transition: "stroke-dashoffset 0.1s ease-out",
              filter: "drop-shadow(0px 1px 2px rgba(211, 47, 47, 0.4))",
            }}
          />
        </svg>
      </div>

      {/* Background soft glowing highlights */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-orange-100/35 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-rose-100/40 blur-3xl pointer-events-none -z-10" />

      {/* Vertical centered Red Thread Poem */}
      <div className="relative text-center max-w-xl mx-auto space-y-8 py-8 z-10">
        <span className="font-sans text-[10px] tracking-[0.3em] text-romantic-dark/50 uppercase block">
          La Antigua Leyenda del Destino
        </span>

        {/* Vertical Stanzas */}
        <div className="space-y-6 font-serif text-lg md:text-xl text-romantic-dark/95 leading-relaxed tracking-wide italic">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            "Un hilo rojo invisible
            <br />
            conecta a aquellos que están
            <br />
            destinados a encontrarse,"
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-romantic-red/90 font-medium"
          >
            "sin importar el tiempo,
            <br />
            el lugar o las circunstancias."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            "El hilo se puede estirar,
            <br />
            contraer o enredar..."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="font-cursive text-4xl text-romantic-dark pt-2"
          >
            pero nunca se romperá.
          </motion.p>
        </div>
      </div>

      {/* Footer Interactive Graphic representing ankles bound by the red thread */}
      <div className="relative mt-12 w-full max-w-sm flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center mb-6"
        >
          {/* Elegant minimalist outline SVG of hands or feet with pinky/ankle loop */}
          <svg
            className="w-64 h-32 text-romantic-dark"
            viewBox="0 0 250 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            {/* Ground line */}
            <line x1="20" y1="105" x2="230" y2="105" stroke="#3D2E28" strokeWidth="0.5" strokeDasharray="3 3" />
            
            {/* Left foot/ankle line art */}
            <path d="M 60 20 C 60 70, 50 85, 45 95 C 40 100, 45 105, 55 105 C 70 105, 75 90, 80 85 C 85 80, 85 20, 85 20" />
            {/* Right foot/ankle line art */}
            <path d="M 190 20 C 190 70, 200 85, 205 95 C 210 100, 205 105, 195 105 C 180 105, 175 90, 170 85 C 165 80, 165 20, 165 20" />

            {/* Red Thread wrapping ankles and tied in bows */}
            <g className="text-romantic-red">
              {/* Loop around left ankle */}
              <path d="M 60 85 C 55 83, 50 86, 52 91 C 54 94, 66 91, 75 88" stroke="currentColor" strokeWidth="2" />
              <circle cx="60" cy="88" r="2.5" fill="currentColor" />
              
              {/* Loop around right ankle */}
              <path d="M 190 85 C 195 83, 200 86, 198 91 C 196 94, 184 91, 175 88" stroke="currentColor" strokeWidth="2" />
              <circle cx="190" cy="88" r="2.5" fill="currentColor" />
              
              {/* Bow details & connectors */}
              <path d="M 75 88 C 100 80, 150 80, 175 88" stroke="currentColor" strokeWidth="2" />
              
              {/* Beautiful central ribbon bow tied in the middle */}
              <path d="M 125 84 C 115 70, 110 84, 125 84" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <path d="M 125 84 C 135 70, 140 84, 125 84" stroke="currentColor" strokeWidth="1.8" fill="none" />
              
              {/* Hanging strands */}
              <path d="M 125 84 C 120 95, 115 97, 116 102" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 125 84 C 128 95, 133 97, 131 102" stroke="currentColor" strokeWidth="1.5" />
              
              <circle cx="125" cy="84" r="3" fill="currentColor" />
            </g>
          </svg>
        </motion.div>

        {/* Labels indicating foot binding */}
        <span className="font-sans text-[11px] tracking-[0.2em] text-romantic-dark/50 uppercase text-center block mb-8">
          NUESTROS PASOS ENLAZADOS
        </span>

        {/* Button "Descúbrelo" with specific smooth transition curve */}
        <button
          onClick={onDiscover}
          id="btn-discover"
          className="relative px-8 py-3.5 bg-romantic-red hover:bg-[#B71C1C] text-white font-sans text-xs font-semibold uppercase tracking-widest rounded-full shadow-[0_4px_20px_-2px_rgba(211,47,47,0.3)] transition-all duration-[400ms] cubic-bezier(0.16, 1, 0.3, 1) hover:scale-105 active:scale-98 overflow-hidden group focus:outline-none"
        >
          {/* Shining hover slide effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          Descúbrelo
        </button>
      </div>
    </section>
  );
}
