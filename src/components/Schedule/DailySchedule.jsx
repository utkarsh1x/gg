import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { weekendStickyNotes } from '../../data/initialSchedule';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Lock, 
  Pin, 
  Coffee, 
  GraduationCap, 
  PlayCircle, 
  BookOpen, 
  CheckSquare, 
  Sparkles,
  Zap
} from 'lucide-react';

export const DailySchedule = () => {
  const { weekdayBlocks, weekendBlocks, toggleScheduleBlock } = usePlanner();
  const [scheduleType, setScheduleType] = useState('weekday'); // 'weekday' or 'weekend'

  const currentBlocks = scheduleType === 'weekend' ? weekendBlocks : weekdayBlocks;

  const getColorStyles = (color, isDisabled) => {
    if (isDisabled) {
      return {
        cardBg: 'bg-slate-100 dark:bg-slate-900/40 border-slate-300 dark:border-slate-800/80 opacity-70',
        badgeBg: 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700',
        text: 'text-slate-500 dark:text-slate-400'
      };
    }

    switch (color) {
      case 'green':
        return {
          cardBg: 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30',
          badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          text: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'yellow':
        return {
          cardBg: 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30',
          badgeBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          text: 'text-amber-600 dark:text-amber-400'
        };
      case 'blue':
        return {
          cardBg: 'bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/30',
          badgeBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
          text: 'text-cyan-600 dark:text-cyan-400'
        };
      case 'purple':
        return {
          cardBg: 'bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500/30',
          badgeBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
          text: 'text-indigo-600 dark:text-indigo-400'
        };
      default:
        return {
          cardBg: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800',
          badgeBg: 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700',
          text: 'text-slate-900 dark:text-white'
        };
    }
  };

  const actionableBlocks = currentBlocks.filter(b => !b.isDisabled);
  const completedActionableCount = actionableBlocks.filter(b => b.completed).length;
  const progressPercent = actionableBlocks.length > 0 
    ? Math.round((completedActionableCount / actionableBlocks.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold">Dynamic Daily Timetable Widget</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Optimized for undergraduate college schedule (8 AM - 5 PM blocked). Switch between Weekday study routine and Weekend intensive study mode.
          </p>
        </div>

        {/* Schedule Mode Switcher */}
        <div className="w-full md:w-auto flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700">
          <button
            onClick={() => setScheduleType('weekday')}
            className={`flex-1 min-w-0 px-2 sm:px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center truncate ${
              scheduleType === 'weekday'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekday Mode<span className="hidden sm:inline">&nbsp;(Mon-Fri)</span>
          </button>
          <button
            onClick={() => setScheduleType('weekend')}
            className={`flex-1 min-w-0 px-2 sm:px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center truncate ${
              scheduleType === 'weekend'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekend Mode<span className="hidden sm:inline">&nbsp;(Sat-Sun)</span>
          </button>
        </div>
      </div>

      {/* Progress & Routine Summary Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-500 font-bold flex items-center justify-center text-sm">
            {progressPercent}%
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">
              {scheduleType === 'weekday' ? 'Weekday Study Execution' : 'Weekend Intensive Execution (8-10h)'}
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {completedActionableCount} of {actionableBlocks.length} Actionable Blocks Completed Today
            </div>
          </div>
        </div>
        
        <div className="w-48 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden hidden sm:block">
          <div 
            className="bg-cyan-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Sticky Notes Reminders Section for Weekend View */}
      {scheduleType === 'weekend' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weekendStickyNotes.map(note => (
            <div 
              key={note.id} 
              className={`p-5 rounded-2xl border shadow-lg space-y-3 relative overflow-hidden ${note.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Pin className={`w-4 h-4 transform -rotate-45 ${note.iconColor}`} />
                  <span className="text-xs font-black uppercase tracking-wider opacity-80">
                    {note.day}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/40 dark:bg-black/30 border border-current">
                  Persistent Reminder
                </span>
              </div>

              <h3 className="font-extrabold text-base leading-snug">
                {note.title}
              </h3>

              <ul className="space-y-1.5 text-xs opacity-90 pl-4 list-disc">
                {note.bulletPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Time Blocks Timetable */}
      <div className="space-y-4">
        {currentBlocks.map((block) => {
          const styles = getColorStyles(block.color, block.isDisabled);

          return (
            <div
              key={block.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${styles.cardBg} ${
                block.completed ? 'ring-2 ring-emerald-500/40' : ''
              }`}
            >
              
              {/* Left Column: Checkbox & Time */}
              <div className="flex items-center space-x-4 w-full min-w-0 sm:w-auto sm:min-w-[260px]">
                {block.isDisabled ? (
                  <div 
                    title="College Hours (Blocked)"
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-400 flex items-center justify-center cursor-not-allowed border border-slate-300 dark:border-slate-700"
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                ) : (
                  <button
                    onClick={() => toggleScheduleBlock(scheduleType === 'weekend', block.id)}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center transition ${
                      block.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                        : 'border-slate-300 dark:border-slate-700 text-transparent hover:border-cyan-500'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}

                <div>
                  <div className="text-sm font-black font-mono text-slate-900 dark:text-white">
                    {block.timeBlock}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold border mt-1 ${styles.badgeBg}`}>
                    {block.isDisabled && <Lock className="w-3 h-3 mr-1" />}
                    <span>{block.title}</span>
                  </span>
                </div>
              </div>

              {/* Middle Column: Description / Strategy */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-bold text-base ${block.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                    {block.title}
                  </h4>
                  {block.hours && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {block.hours}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {block.strategy}
                </p>
              </div>

              {/* Right Column: Action Button or Disabled Tag */}
              <div className="text-right flex-shrink-0">
                {block.isDisabled ? (
                  <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 cursor-not-allowed">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Classes Locked</span>
                  </span>
                ) : (
                  <button
                    onClick={() => toggleScheduleBlock(scheduleType === 'weekend', block.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition border shadow-sm ${
                      block.completed
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-cyan-500 hover:text-white hover:border-cyan-500'
                    }`}
                  >
                    {block.completed ? 'Completed ✓' : 'Mark Completed'}
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
