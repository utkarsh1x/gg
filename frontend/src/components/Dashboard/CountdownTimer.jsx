import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle, Sparkles } from 'lucide-react';

export const CountdownTimer = () => {
  const targetDate = new Date('2027-08-01T00:00:00').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-2xl space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Timer className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base flex items-center gap-1.5">
              Deadline for 100% Syllabus Completion
            </h3>
            <p className="text-xs text-slate-400">
              August 1, 2027 Target • Full Syllabus & Mock Phase Mandate
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5 mr-1" />
          100% Goal
        </span>
      </div>

      {/* Countdown Digits */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center pt-1">
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono leading-none">
            {timeLeft.days}
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Days</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono leading-none">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Hours</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono leading-none">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Mins</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono leading-none">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Secs</span>
        </div>
      </div>
    </div>
  );
};
