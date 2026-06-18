import React, { useState, useEffect } from "react";

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  years: number;
  months: number;
  remainingDays: number;
}

export function TimeCounter() {
  const [elapsed, setElapsed] = useState<TimeElapsed | null>(null);

  useEffect(() => {
    const AnniversaryDate = new Date("2022-03-18T00:00:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diffMs = now - AnniversaryDate;

      // Simple counts
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const days = totalDays;
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      // Calendar years, months calculations for more depth
      const start = new Date("2022-03-18T00:00:00");
      const current = new Date();
      
      let years = current.getFullYear() - start.getFullYear();
      let months = current.getMonth() - start.getMonth();
      let remainingDays = current.getDate() - start.getDate();

      if (remainingDays < 0) {
        months -= 1;
        // get days in previous month
        const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
        remainingDays += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setElapsed({
        days,
        hours,
        minutes,
        seconds,
        totalDays,
        years,
        months,
        remainingDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!elapsed) return null;

  return (
    <div id="time-counter" className="w-full max-w-lg mx-auto bg-white/40 backdrop-blur-xs border border-white/60 shadow-xs rounded-2xl p-6 text-center space-y-6">
      <div className="space-y-1">
        <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-romantic-dark/60">
          Tiempo Compartido
        </h3>
        <p className="font-cursive text-3xl text-romantic-red">
          Nuestra Historia en Números
        </p>
      </div>

      {/* Grid of raw Days / Hours / Minutes / Seconds */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="bg-white/85 shadow-xs rounded-xl p-3 flex flex-col justify-center border border-white">
          <span className="font-sans font-bold text-xl md:text-3xl text-romantic-dark tracking-tight">
            {elapsed.days}
          </span>
          <span className="font-sans text-[10px] md:text-xs text-romantic-dark/50 uppercase tracking-widest mt-1">
            Días
          </span>
        </div>

        <div className="bg-white/85 shadow-xs rounded-xl p-3 flex flex-col justify-center border border-white">
          <span className="font-sans font-bold text-xl md:text-3xl text-romantic-dark tracking-tight">
            {String(elapsed.hours).padStart(2, "0")}
          </span>
          <span className="font-sans text-[10px] md:text-xs text-romantic-dark/50 uppercase tracking-widest mt-1">
            Horas
          </span>
        </div>

        <div className="bg-white/85 shadow-xs rounded-xl p-3 flex flex-col justify-center border border-white">
          <span className="font-sans font-bold text-xl md:text-3xl text-romantic-dark tracking-tight">
            {String(elapsed.minutes).padStart(2, "0")}
          </span>
          <span className="font-sans text-[10px] md:text-xs text-romantic-dark/50 uppercase tracking-widest mt-1">
            Min
          </span>
        </div>

        <div className="bg-white/85 shadow-xs rounded-xl p-3 flex flex-col justify-center border border-white">
          <span className="font-sans font-bold text-xl md:text-3xl text-romantic-red tracking-tight">
            {String(elapsed.seconds).padStart(2, "0")}
          </span>
          <span className="font-sans text-[10px] md:text-xs text-romantic-red/75 uppercase tracking-widest mt-1">
            Seg
          </span>
        </div>
      </div>

      {/* Detailed sentence */}
      <p className="font-serif italic text-base text-romantic-dark/80 px-2 leading-relaxed">
        “Han pasado <span className="font-semibold text-romantic-dark">{elapsed.years} años</span>,{" "}
        <span className="font-semibold text-romantic-dark">{elapsed.months} meses</span>{" y "}
        <span className="font-semibold text-romantic-dark">{elapsed.remainingDays} días</span> caminando por el mismo sendero del destino, enlazados por el hilo rojo de la vida.”
      </p>
    </div>
  );
}
