import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { 
  LayoutGrid, 
  Clock, 
  BookOpenCheck, 
  BarChart3,
  CheckCircle2,
  Zap
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, metrics } = usePlanner();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, desc: 'Overview & Focus' },
    { id: 'schedule', label: 'Timetable', icon: Clock, desc: 'College & Study Blocks' },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpenCheck, desc: 'Roadmap Checklist' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Marks & AIR Trends' },
  ];

  return (
    <>
      {/* Desktop Sidebar (md and up) */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex-col justify-between transition-colors duration-200">
        <div className="p-4 space-y-6">
          
          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                      isActive
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 dark:bg-cyan-600'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    <div className="text-left">
                      <div className="leading-tight">{item.label}</div>
                      <div className={`text-[10px] ${isActive ? 'text-cyan-100' : 'text-slate-400 dark:text-slate-500'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Milestone Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-800/80 dark:to-slate-900 border border-slate-800 text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Syllabus Milestone
              </span>
              <span className="font-mono text-cyan-400 font-bold">{metrics.overallPercentage}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${metrics.overallPercentage}%` }}
              />
            </div>

            <div className="text-[11px] text-slate-400 flex justify-between pt-1">
              <span>Goal: 80% Coverage</span>
              <span>{metrics.completedSubjects}/{metrics.totalSubjects} Subjects</span>
            </div>
          </div>

        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-400 dark:text-slate-500 space-y-1">
          <p className="font-medium text-slate-600 dark:text-slate-400">Mobile Ready (8 AM - 5 PM)</p>
          <p className="text-[11px]">15-min flashcard revision check-offs between college lectures.</p>
        </div>
      </aside>

      {/* Mobile Fixed Bottom Navigation Bar (md:hidden) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition min-h-[44px] ${
                isActive
                  ? 'text-cyan-500 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
