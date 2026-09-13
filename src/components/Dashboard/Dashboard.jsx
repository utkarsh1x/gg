import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { CircularProgress } from './CircularProgress';
import { TodaysFocus } from './TodaysFocus';
import { StreakCalendar } from './StreakCalendar';
import { CountdownTimer } from './CountdownTimer';
import { BookOpen, CheckSquare, Award, Clock, ArrowRight, ShieldCheck, Flame, Smartphone } from 'lucide-react';

export const Dashboard = () => {
  const { metrics, setActiveTab, currentStreak } = usePlanner();

  const getRankEstimation = (covered) => {
    if (covered >= 75) return { rank: 'Top 10 - 50', desc: 'Elite Performance (Top IITs)', color: 'text-amber-400' };
    if (covered >= 65) return { rank: 'Top 200 - 500', desc: 'Strong Rank (Mid-tier IITs / NITs)', color: 'text-emerald-400' };
    if (covered >= 55) return { rank: 'Top 1000 - 2000', desc: 'Good Rank (NITs & Premier Inst.)', color: 'text-cyan-400' };
    if (covered >= 40) return { rank: 'Top 5000', desc: 'Qualifying Standard', color: 'text-blue-400' };
    return { rank: 'Targeting 80%', desc: 'Building Foundations', color: 'text-slate-400' };
  };

  const rankInfo = getRankEstimation(metrics.coveredWeightage);

  return (
    <div className="space-y-6">
      
      {/* 1. Countdown Timer (Top of Dashboard Deadline Aug 1, 2027) */}
      <CountdownTimer />

      {/* 2. Top Banner / Hero Greeting */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl transform skew-x-12 pointer-events-none hidden md:block" />
        
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-cyan-100">
            <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>GATE CSE 2028 Academic Sprint</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Target: 80% Syllabus Mastery by August 1, 2027
          </h2>
          <p className="text-sm text-cyan-100/90 leading-relaxed">
            Designed for college students with 8 AM - 5 PM class constraints. Optimized for mobile 15-min flashcard revisions between lectures.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-semibold text-cyan-100">
          <button 
            onClick={() => setActiveTab('syllabus')}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-cyan-50 font-bold transition flex items-center gap-1.5 shadow-lg"
          >
            <span>Open Syllabus Checklist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4" />
            <span>View Timetable</span>
          </button>
        </div>
      </div>

      {/* 3. Core Grid: Goal Circle + Today's Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Prominent Goal Circle Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 text-center">
            Overall Syllabus Goal
          </h3>
          <CircularProgress 
            percentage={metrics.overallPercentage} 
            targetPercentage={80} 
            coveredWeightage={metrics.coveredWeightage}
          />
        </div>

        {/* Today's Focus Card (Takes 2 columns on lg) */}
        <div className="lg:col-span-2">
          <TodaysFocus />
        </div>

      </div>

      {/* 4. Second Row: Weekly Streak & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Streak Widget (Takes 2 cols) */}
        <div className="lg:col-span-2">
          <StreakCalendar />
        </div>

        {/* Metric Cards Stack */}
        <div className="space-y-4 flex flex-col justify-between">
          
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs text-slate-400 font-medium">Estimated GATE Marks</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ~{metrics.coveredWeightage} <span className="text-xs text-slate-400 font-normal">/ 80 Marks Goal</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs text-slate-400 font-medium">Subjects Mastered</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {metrics.completedSubjects} <span className="text-xs text-slate-400 font-normal">/ {metrics.totalSubjects} Subjects</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CheckSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Rank Projection Mode
              </span>
              <span className={`text-xs font-bold ${rankInfo.color}`}>
                {rankInfo.rank}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {rankInfo.desc}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
