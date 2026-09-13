import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { isSubject100PercentComplete } from '../../data/initialSyllabus';
import { 
  ChevronDown, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle, 
  HelpCircle, 
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AccordionView = ({ searchQuery, selectedPhaseFilter }) => {
  const { syllabus, toggleChecklist, updateSubjectNotes } = usePlanner();

  const [expandedPhases, setExpandedPhases] = useState(() => {
    return syllabus.reduce((acc, p) => ({ ...acc, [p.phaseId]: true }), {});
  });

  const [editingNotesSubjId, setEditingNotesSubjId] = useState(null);
  const [tempNotesText, setTempNotesText] = useState('');

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const handleOpenNotes = (subject) => {
    setEditingNotesSubjId(subject.id);
    setTempNotesText(subject.notes || '');
  };

  const handleSaveNotes = (phaseId, subjectId) => {
    updateSubjectNotes(phaseId, subjectId, tempNotesText);
    setEditingNotesSubjId(null);
  };

  const filteredSyllabus = syllabus.filter(phase => {
    if (selectedPhaseFilter !== 'all' && phase.phaseId !== selectedPhaseFilter) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const phaseMatch = phase.phaseName.toLowerCase().includes(query);
    const subjectMatch = phase.subjects.some(s => 
      s.name.toLowerCase().includes(query) || 
      s.subTasks.some(t => t.label.toLowerCase().includes(query))
    );
    return phaseMatch || subjectMatch;
  });

  return (
    <div className="space-y-6">
      
      {filteredSyllabus.map(phase => {
        const isExpanded = expandedPhases[phase.phaseId];

        let totalSubTasks = 0;
        let completedSubTasks = 0;
        phase.subjects.forEach(s => {
          const checks = Object.values(s.checklist);
          totalSubTasks += checks.length;
          completedSubTasks += checks.filter(Boolean).length;
        });
        const phasePercentage = totalSubTasks > 0 ? Math.round((completedSubTasks / totalSubTasks) * 100) : 0;

        return (
          <div key={phase.phaseId} className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            
            {/* Phase Accordion Bar */}
            <div 
              onClick={() => togglePhase(phase.phaseId)}
              className="p-5 bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/60 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-slate-200/60 dark:hover:bg-slate-800"
            >
              <div className="flex items-center space-x-3">
                <button className="p-1 rounded-lg text-slate-400">
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-cyan-500" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                      {phase.phaseName}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      {phase.timeline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {phase.objective}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-medium">Phase Progress</span>
                  <div className="text-sm font-black text-cyan-600 dark:text-cyan-400 font-mono">
                    {phasePercentage}% Completed
                  </div>
                </div>
                <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div 
                    className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${phasePercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Accordion Content Body */}
            {isExpanded && (
              <div className="p-5 space-y-6">
                {phase.subjects.map(subject => {
                  const is100Done = isSubject100PercentComplete(subject);
                  
                  const subTasksCount = subject.subTasks.length;
                  const checkedCount = Object.values(subject.checklist).filter(Boolean).length;
                  const subjPercentage = Math.round((checkedCount / subTasksCount) * 100);

                  const pyqChecked = !!subject.checklist.solvePYQs;
                  const testChecked = subject.checklist.madeEasyTest === undefined ? true : !!subject.checklist.madeEasyTest;

                  return (
                    <div 
                      key={subject.id} 
                      className={`p-5 rounded-2xl border transition-all duration-200 space-y-4 ${
                        is100Done
                          ? 'bg-emerald-500/5 border-emerald-500/30'
                          : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      
                      {/* Subject Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                              {subject.name}
                            </h4>
                            {subject.weightage > 0 && (
                              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                ~{subject.weightage} Marks
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-1">
                            {is100Done ? (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>100% Mastered (PYQs & Test Complete)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                <AlertCircle className="w-3 h-3" />
                                <span>
                                  In Progress ({subjPercentage}%) • {!pyqChecked && !testChecked ? 'Requires PYQs & Test' : !pyqChecked ? 'Requires PYQs' : 'Requires Made Easy Test'}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Playlist Link & Notes */}
                        <div className="flex items-center space-x-2">
                          <a
                            href={subject.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-md shadow-red-600/20"
                            title="Open Full Amit Khurana Playlist"
                          >
                            <PlayCircle className="w-4 h-4 fill-white text-red-600" />
                            <span>Amit Khurana Playlist</span>
                            <ExternalLink className="w-3 h-3 opacity-80" />
                          </a>

                          <button
                            onClick={() => handleOpenNotes(subject)}
                            className="p-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Notes & Formula Log"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Sub-Task Checkboxes Grid with Right-Aligned Action Links */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subject.subTasks.map(task => {
                          const isChecked = !!subject.checklist[task.key];
                          const isPYQ = task.type === 'pyq';
                          const isTest = task.type === 'test';

                          let Icon = PlayCircle;
                          if (isPYQ) Icon = CheckCircle;
                          if (isTest) Icon = HelpCircle;

                          const youtubeSearchUrl = `https://www.youtube.com/@AmitKhuranaSir/search?query=${encodeURIComponent(subject.name + " " + task.label)}`;
                          const testPortalUrl = "https://onlinetestseries.madeeasy.in/";

                          return (
                            <div
                              key={task.key}
                              className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-150 ${
                                isChecked
                                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-900 dark:text-emerald-300'
                                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-cyan-500/50'
                              }`}
                            >
                              {/* Left side: Checkbox & Task Label */}
                              <div 
                                onClick={() => toggleChecklist(phase.phaseId, subject.id, task.key)}
                                className="flex items-center space-x-2.5 truncate cursor-pointer flex-1 pr-2 min-h-[38px]"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 pointer-events-none flex-shrink-0"
                                />
                                <div className="flex items-center space-x-1.5 truncate">
                                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isChecked ? 'text-emerald-500' : 'text-slate-400'}`} />
                                  <span className={`text-xs font-bold truncate ${isChecked ? 'line-through opacity-80' : 'text-slate-900 dark:text-white'}`}>
                                    {task.label}
                                  </span>
                                </div>
                              </div>

                              {/* Right side: Action Link Button (Prevent Checkbox Toggle on click) */}
                              <div className="flex-shrink-0">
                                {isTest ? (
                                  <a
                                    href={testPortalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold bg-amber-500/15 dark:bg-amber-500/25 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white border border-amber-500/30 transition flex items-center gap-1 shadow-sm min-h-[36px]"
                                    title="Open Made Easy Test Portal"
                                  >
                                    <span>📝 Take Test</span>
                                    <ExternalLink className="w-3 h-3 opacity-90" />
                                  </a>
                                ) : (
                                  <a
                                    href={youtubeSearchUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30 transition flex items-center gap-1 shadow-sm min-h-[36px]"
                                    title={`Watch ${task.label} Video on Amit Khurana Channel`}
                                  >
                                    <span>▶️ Watch Video</span>
                                    <ExternalLink className="w-3 h-3 opacity-90" />
                                  </a>
                                )}
                              </div>

                            </div>
                          );
                        })}
                      </div>

                      {/* Displayed Subject Notes */}
                      {subject.notes && editingNotesSubjId !== subject.id && (
                        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 font-mono">
                          <strong>Formula & Notes Log:</strong> {subject.notes}
                        </div>
                      )}

                      {/* Notes Editor Inline Form */}
                      {editingNotesSubjId === subject.id && (
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-2">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                            Subject Formula Log & Notes for "{subject.name}":
                          </label>
                          <textarea
                            value={tempNotesText}
                            onChange={(e) => setTempNotesText(e.target.value)}
                            rows={3}
                            placeholder="Write key formulas, concepts, or doubt logs..."
                            className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-300 dark:border-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingNotesSubjId(null)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNotes(phase.phaseId, subject.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600"
                            >
                              Save Notes
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        );
      })}

    </div>
  );
};
