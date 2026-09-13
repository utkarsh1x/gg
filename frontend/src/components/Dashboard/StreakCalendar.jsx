import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { Flame, Calendar, Check, Award } from 'lucide-react';

export const StreakCalendar = () => {
  const { streakLogs, toggleStreakDate, currentStreak } = usePlanner();

  // Generate days of the current week (Monday to Sunday)
  const getWeekDays = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 is Sun, 1 is Mon...
    const distanceToMon = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMon);

    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = d.toISOString().split('T')[0] === today.toISOString().split('T')[0];

      days.push({
        name: dayNames[i],
        dateNum: d.getDate(),
        dateStr,
        isToday,
        isCompleted: !!streakLogs[dateStr]
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  // Generate 28-day (4-week) heatmap
  const getHeatmapDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        dateStr,
        isToday: i === 0,
        isCompleted: !!streakLogs[dateStr]
      });
    }
    return days;
  };

  const heatmapDays = getHeatmapDays();

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Weekly Streak Calendar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log study consistency & stay accountable
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black text-amber-500 flex items-center justify-end gap-1">
              <span>{currentStreak}</span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Days</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Active Streak
            </span>
          </div>
        </div>

        {/* Current Week Day Cards */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map(day => (
            <button
              key={day.dateStr}
              onClick={() => toggleStreakDate(day.dateStr)}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all duration-200 ${
                day.isCompleted
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : day.isToday
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 ring-2 ring-cyan-500/30'
                  : 'bg-slate-100/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:border-slate-400'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">{day.name}</span>
              <span className="text-sm font-black my-1">{day.dateNum}</span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                day.isCompleted
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
              }`}>
                {day.isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : null}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 28-Day Consistency Heatmap Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span className="font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-500" />
            28-Day Activity Heatmap
          </span>
          <span className="text-[11px] text-slate-400">Click week day to toggle</span>
        </div>

        <div className="grid grid-cols-14 gap-1.5 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          {heatmapDays.map(d => (
            <div
              key={d.dateStr}
              title={`${d.dateStr} ${d.isCompleted ? '(Active Study)' : '(Rest)'}`}
              className={`h-4 rounded-sm transition-colors ${
                d.isCompleted
                  ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                  : d.isToday
                  ? 'bg-cyan-400/40 ring-1 ring-cyan-400'
                  : 'bg-slate-300 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end space-x-3 text-[10px] text-slate-400 mt-2">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-slate-800"></span> Off
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Studied
          </span>
        </div>
      </div>

    </div>
  );
};
