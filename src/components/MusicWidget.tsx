import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const activeOscillatorsRef = useRef<AudioNode[]>([]);

  // Romantic acoustic chime progression: warm chord degrees
  // Cmaj7 -> Fmaj7 -> G6 -> Am7
  const melodyNotes = [
    // Stanza 1
    [261.63, 329.63, 392.00, 493.88], // C, E, G, B (Cmaj7)
    [349.23, 440.00, 523.25, 587.33], // F, A, C, E (Fmaj7)
    [392.00, 493.88, 587.33, 659.25], // G, B, D, F# (Gmaj7)
    [440.00, 523.25, 659.25, 783.99], // A, C, E, G (Am7)
  ];

  const playChime = (frequency: number, startTime: number, duration: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Create primary oscillator
    const osc = ctx.createOscillator();
    // Beautiful warm sine/triangle wave blend
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, startTime);

    // Create a sub-oscillator for warmth (one octave down)
    const subOsc = ctx.createOscillator();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(frequency / 2, startTime);

    // Filter to remove sharp metallic highs
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(150, startTime + duration);

    // Envelope gain node
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.05); // low volume safe background
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Connect nodes
    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start and stop
    osc.start(startTime);
    osc.stop(startTime + duration);
    subOsc.start(startTime);
    subOsc.stop(startTime + duration);

    // Keep track to stop when paused
    activeOscillatorsRef.current.push(osc, subOsc);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      // Pause
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Lazy initialize AudioContext on user interaction
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      setIsPlaying(true);
      let step = 0;

      const scheduleMelody = () => {
        const chord = melodyNotes[step % melodyNotes.length];
        const now = ctx.currentTime;

        // Arpeggiate the current chord beautifully
        chord.forEach((freq, idx) => {
          // Play each note with a slight staggered delay for a hand-plucked harp feel
          const noteStart = now + idx * 0.45;
          const noteDur = 1.6 + Math.random() * 0.4;
          playChime(freq, noteStart, noteDur);
        });

        // Add a sweet high-register bell note occasionally
        if (step % 2 === 0) {
          const highNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 987.77];
          const bellFreq = highNotes[Math.floor(Math.random() * highNotes.length)];
          playChime(bellFreq, now + 1.8, 1.2);
        }

        step++;
      };

      // Play immediately
      scheduleMelody();

      // Schedule chord sequences every 3.2 seconds
      intervalRef.current = setInterval(scheduleMelody, 3200) as any;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      id="music-box-widget"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-white/75 backdrop-blur-md border border-neutral-200/60 rounded-full py-2.5 px-4 shadow-sm hover:shadow-md transition-all duration-300 group max-w-[210px] sm:max-w-xs"
    >
      <button
        onClick={togglePlayback}
        aria-label="Toggle ambient chimes"
        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
          isPlaying
            ? "bg-romantic-red text-white scale-103 shadow-md shadow-romantic-red/20"
            : "bg-neutral-100/80 text-romantic-dark hover:bg-neutral-200"
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 animate-bounce" />
        ) : (
          <VolumeX className="w-4 h-4 text-romantic-dark/60" />
        )}
      </button>

      <div className="flex flex-col text-left select-none overflow-hidden">
        <span className="font-sans text-[10px] font-semibold text-romantic-dark/80 tracking-widest uppercase truncate">
          {isPlaying ? "MÚSICA ACTIVA" : "MÚSICA AMBIENTAL"}
        </span>
        <span className="font-serif text-[11px] italic text-romantic-dark/60 truncate leading-snug">
          {isPlaying ? "Caja de Música del Destino" : "Activar melodía romántica"}
        </span>
      </div>

      {isPlaying && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-romantic-coral opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-romantic-red"></span>
        </span>
      )}
    </div>
  );
}
