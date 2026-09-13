import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { isSubject100PercentComplete } from '../../data/initialSyllabus';
import { Target, PlayCircle, CheckCircle, HelpCircle, ArrowRight, BookOpen, Clock, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';

export const TodaysFocus = () => {
  const { syllabus, todayFocus, setTodayFocus, toggleChecklist } = usePlanner();
  const [isChangingFocus, setIsChangingFocus] = useState(false);

  // Flatten subjects across phases
  const allSubjects = [];
  syllabus.forEach(phase => {
    phase.subjects.forEach(subj => {
      allSubjects.push({
        phaseId: phase.phaseId,
        phaseName: phase.phaseName,
        subject: subj
      });
    });
  });

  const activeEntry = allSubjects.find(s => s.subject.id === todayFocus.subjectId) || allSubjects[0];
  const activeSubject = activeEntry ? activeEntry.subject : null;

  if (!activeSubject) return null;

  const is100Done = isSubject100PercentComplete(activeSubject);
  const checkedCount = Object.values(activeSubject.checklist).filter(Boolean).length;
  const totalCount = activeSubject.subTasks.length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  const handleSelectSubject = (subjId) => {
    const selected = allSubjects.find(s => s.subject.id === subjId);
    if (selected) {
      setTodayFocus({
        subjectId: selected.subject.id,
        subjectName: selected.subject.name
      });
    }
    setIsChangingFocus(false);
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Today's Focus Subject
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {activeSubject.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsChangingFocus(!isChangingFocus)}
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>{isChangingFocus ? 'Cancel' : 'Change Subject'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Change Subject Dropdown */}
        {isChangingFocus && (
          <div className="mb-6 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Select Active Subject:
            </label>
            <select
              value={activeSubject.id}
              onChange={(e) => handleSelectSubject(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs rounded-lg p-2.5 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              {allSubjects.map(s => (
                <option key={s.subject.id} value={s.subject.id}>
                  [{s.phaseName.split(':')[0]}] {s.subject.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Subject Card Banner */}
        <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Phase: {activeEntry.phaseName}
              </span>
              {activeSubject.weightage > 0 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  ~{activeSubject.weightage} Marks
                </span>
              )}
            </div>

            <a
              href={activeSubject.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-sm"
            >
              <PlayCircle className="w-3.5 h-3.5 fill-white text-red-600" />
              <span>Amit Khurana Playlist</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              Completion: {checkedCount}/{totalCount} Sub-tasks
            </span>
            <span className={`font-bold ${is100Done ? 'text-emerald-500' : 'text-cyan-500'}`}>
              {is100Done ? '100% Mastered' : `${progressPercent}% Done`}
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${is100Done ? 'bg-emerald-500' : 'bg-cyan-500'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Actionable Sub-tasks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeSubject.subTasks.map(task => {
            const isChecked = !!activeSubject.checklist[task.key];
            const isPYQ = task.type === 'pyq';
            const isTest = task.type === 'test';
            let Icon = PlayCircle;
            if (isPYQ) Icon = CheckCircle;
            if (isTest) Icon = HelpCircle;

            return (
              <button
                key={task.key}
                onClick={() => toggleChecklist(activeEntry.phaseId, activeSubject.id, task.key)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-150 ${
                  isChecked
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-300'
                    : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <div className={`p-1.5 rounded-lg ${
                    isChecked ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-bold truncate ${isChecked ? 'line-through opacity-80' : 'text-slate-900 dark:text-white'}`}>
                    {task.label}
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-emerald-600 pointer-events-none"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Hours footer */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-cyan-500 shrink-0" />
          <span>Recommended Study: <strong>3.5 - 4.0 Hours/day</strong></span>
        </span>
        <span className="flex items-center gap-1 text-amber-500 font-semibold">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          Keep Up the Momentum!
        </span>
      </div>

    </div>
  );
};
