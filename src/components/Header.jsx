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

  // Target deadline: August 31, 2027
  const calculateDaysLeft = () => {
    const targetDate = new Date('2027-08-31T23:59:59');
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
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Target Indicator */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
                GATE CSE 2028
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                Aug 2027 Blueprint
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Target: 80% Syllabus Coverage • Amit Khurana & Made Easy Ecosystem
            </p>
          </div>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Days Left Countdown */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              <strong className="text-slate-900 dark:text-white font-bold">{calculateDaysLeft()}</strong> days to Aug 2027 Target
            </span>
          </div>

          {/* Active Streak */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{currentStreak} Day Streak</span>
          </div>

          {/* Quick Progress Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
            <span>Progress:</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{metrics.overallPercentage}%</span>
          </div>

          {/* Data Backup / Restore */}
          <div className="flex items-center space-x-1 border-l border-slate-200 dark:border-slate-700 pl-2">
            <button
              onClick={exportData}
              title="Export Data Backup (JSON)"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import Data Backup (JSON)"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Upload className="w-4 h-4" />
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
              title="Reset All Data"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode (Late-Night Study)"}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

        </div>
      </div>
    </header>
  );
};
