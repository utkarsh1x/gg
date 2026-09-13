import React, { useRef } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Sun, Moon, Download, Upload, RotateCcw, Target, Flame, Sparkles } from 'lucide-react';

export const Header = () => {
  const { 
    theme, 
    setTheme, 
    metrics, 
    currentStreak, 
    exportData, 
    importData, 
    resetAllData 
  } = usePlanner();

  const fileInputRef = useRef(null);

  const calculateDaysLeft = () => {
    const targetDate = new Date('2027-08-01T00:00:00');
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        importData(json);
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Brand & App Title */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0 overflow-hidden">
          <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 flex-shrink-0">
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <h1 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight truncate">
                GATE CSE 2028
              </h1>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                100% Goal
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden lg:block truncate">
              Target: 100% Syllabus Coverage by Aug 2027 • Amit Khurana & Made Easy Ecosystem
            </p>
          </div>
        </div>

        {/* Right Actions Bar */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
          
          {/* Days Left Countdown (Desktop/Tablet) */}
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              <strong className="text-slate-900 dark:text-white font-bold">{calculateDaysLeft()}</strong> days left
            </span>
          </div>

          {/* Active Streak Badge */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 px-1.5 sm:px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{currentStreak}d</span>
          </div>

          {/* Overall Progress Badge (Sm and up) */}
          <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
            <span>{metrics.overallPercentage}%</span>
          </div>

          {/* Backup Action Icons */}
          <div className="flex items-center space-x-0.5 border-l border-slate-200 dark:border-slate-700/80 pl-1">
            <button
              onClick={exportData}
              title="Export Data"
              className="p-1 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import Data"
              className="p-1 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={resetAllData}
              title="Reset Data"
              className="p-1 sm:p-2 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

        </div>
      </div>
    </header>
  );
};
