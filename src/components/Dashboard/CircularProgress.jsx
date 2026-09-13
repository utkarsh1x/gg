import React from 'react';

export const CircularProgress = ({ percentage, targetPercentage = 100, coveredWeightage = 0 }) => {
  const size = 220;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          
          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* 100% Target Marker Dash (Visual Goal line) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="stroke-emerald-500/30 dark:stroke-emerald-400/20"
            strokeWidth={strokeWidth + 4}
            fill="transparent"
            strokeDasharray={`4 ${circumference / 20}`}
            strokeDashoffset={circumference - (targetPercentage / 100) * circumference}
          />

          {/* Progress Path */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="stroke-cyan-500 transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Text Info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-400">
            Syllabus Goal
          </span>
          <div className="flex items-baseline justify-center font-black text-4xl text-slate-900 dark:text-white my-0.5">
            <span>{percentage}%</span>
          </div>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Target: 100% Syllabus
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Estimated Weightage Covered: <strong className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">~{coveredWeightage} / 100 Marks</strong>
        </p>
      </div>
    </div>
  );
};
