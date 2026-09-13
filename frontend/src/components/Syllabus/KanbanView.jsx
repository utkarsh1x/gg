import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { isSubject100PercentComplete } from '../../data/initialSyllabus';
import { PlayCircle, ExternalLink, CheckCircle2 } from 'lucide-react';

export const KanbanView = ({ searchQuery, selectedPhaseFilter }) => {
  const { syllabus, toggleChecklist } = usePlanner();

  const columns = {
    todo: [],
    inProgress: [],
    mastered: []
  };

  syllabus.forEach(phase => {
    if (selectedPhaseFilter !== 'all' && phase.phaseId !== selectedPhaseFilter) return;

    phase.subjects.forEach(subject => {
      const query = searchQuery.toLowerCase();
      if (query && !subject.name.toLowerCase().includes(query) && !phase.phaseName.toLowerCase().includes(query)) {
        return;
      }

      const is100Done = isSubject100PercentComplete(subject);
      const checkedCount = Object.values(subject.checklist).filter(Boolean).length;

      const cardItem = {
        phaseId: phase.phaseId,
        phaseName: phase.phaseName,
        subject
      };

      if (is100Done) {
        columns.mastered.push(cardItem);
      } else if (checkedCount === 0) {
        columns.todo.push(cardItem);
      } else {
        columns.inProgress.push(cardItem);
      }
    });
  });

  const renderSubjectCard = (item) => {
    const { phaseId, subject } = item;
    const is100Done = isSubject100PercentComplete(subject);
    const checkedCount = Object.values(subject.checklist).filter(Boolean).length;
    const totalCount = subject.subTasks.length;
    const progressPercent = Math.round((checkedCount / totalCount) * 100);

    return (
      <div 
        key={subject.id} 
        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 hover:border-cyan-500/50 transition-all duration-150"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
              {subject.name} {subject.weightage > 0 ? `(~${subject.weightage}m)` : ''}
            </span>
            <div className="flex items-center space-x-1.5 mt-1">
              {is100Done ? (
                <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Mastered (100%)
                </span>
              ) : (
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {checkedCount}/{totalCount} Completed
                </span>
              )}
            </div>
          </div>

          <a
            href={subject.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition"
            title="Amit Khurana YouTube Playlist"
          >
            <PlayCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${is100Done ? 'bg-emerald-500' : 'bg-cyan-500'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Sub-tasks Grid with Right Aligned Link Buttons */}
        <div className="space-y-2 pt-1">
          {subject.subTasks.map(task => {
            const isChecked = !!subject.checklist[task.key];
            const isTest = task.type === 'test';
            const youtubeSearchUrl = `https://www.youtube.com/@AmitKhuranaSir/search?query=${encodeURIComponent(subject.name + " " + task.label)}`;
            const testPortalUrl = "https://onlinetestseries.madeeasy.in/";

            return (
              <div
                key={task.key}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                  isChecked
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div 
                  onClick={() => toggleChecklist(phaseId, subject.id, task.key)}
                  className="flex items-center space-x-2 truncate cursor-pointer flex-1 pr-1 min-h-[32px]"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 rounded text-emerald-600 pointer-events-none flex-shrink-0"
                  />
                  <span className={`truncate text-[11px] ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {task.label}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  {isTest ? (
                    <a
                      href={testPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-1 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition flex items-center gap-0.5"
                    >
                      <span>📝 Test</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <a
                      href={youtubeSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-1 rounded text-[10px] font-extrabold bg-red-600/15 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition flex items-center gap-0.5"
                    >
                      <span>▶️ Video</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">To Do (0 Sub-tasks)</h4>
          </div>
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            {columns.todo.length}
          </span>
        </div>

        <div className="space-y-3">
          {columns.todo.map(renderSubjectCard)}
          {columns.todo.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-8">No unstarted subjects!</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <h4 className="font-bold text-cyan-900 dark:text-cyan-300 text-sm">In Progress (PYQs/Test Pending)</h4>
          </div>
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-500 text-white">
            {columns.inProgress.length}
          </span>
        </div>

        <div className="space-y-3">
          {columns.inProgress.map(renderSubjectCard)}
          {columns.inProgress.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-8">No active in-progress subjects.</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">100% Mastered (PYQs & Test Done)</h4>
          </div>
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500 text-white">
            {columns.mastered.length}
          </span>
        </div>

        <div className="space-y-3">
          {columns.mastered.map(renderSubjectCard)}
          {columns.mastered.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-8">Complete all sub-tasks including PYQs & Made Easy Test to move subjects here!</p>
          )}
        </div>
      </div>

    </div>
  );
};
