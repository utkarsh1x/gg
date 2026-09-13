import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { AccordionView } from './AccordionView';
import { KanbanView } from './KanbanView';
import { Search, LayoutList, Columns, Filter, CheckSquare, PlayCircle, FileText, CheckCircle, HelpCircle } from 'lucide-react';

export const SyllabusTracker = () => {
  const { syllabus } = usePlanner();
  const [viewMode, setViewMode] = useState('accordion'); // 'accordion' or 'kanban'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('all');

  return (
    <div className="space-y-6">
      
      {/* Top Banner & View Switcher */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold">GATE CSE Syllabus Tracker</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track your 4-step execution for every module: Watch Lecture ➔ Make Notes ➔ Solve PYQs ➔ Made Easy Test.
          </p>
        </div>

        {/* Accordion vs Kanban View Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700">
          <button
            onClick={() => setViewMode('accordion')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              viewMode === 'accordion'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutList className="w-4 h-4" />
            <span>Accordion List</span>
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              viewMode === 'kanban'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-4 h-4" />
            <span>Kanban Board</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search subject, topic (e.g. Recursion, DFA, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Phase Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedPhaseFilter}
            onChange={(e) => setSelectedPhaseFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl p-2 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All 6 Preparation Phases</option>
            {syllabus.map(p => (
              <option key={p.phaseId} value={p.phaseId}>
                {p.phaseName.split(':')[0]} ({p.timeline.split('–')[0].trim()})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* 4-Step Legend */}
      <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex flex-wrap items-center justify-around gap-2 text-xs text-slate-600 dark:text-slate-300">
        <span className="font-bold text-slate-900 dark:text-white">Sub-Checklist Legend:</span>
        <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
          <PlayCircle className="w-3.5 h-3.5" /> Watch Lecture
        </span>
        <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
          <FileText className="w-3.5 h-3.5" /> Make Notes
        </span>
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-3.5 h-3.5" /> Solve PYQs
        </span>
        <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
          <HelpCircle className="w-3.5 h-3.5" /> Made Easy Test
        </span>
      </div>

      {/* Main View Render */}
      {viewMode === 'accordion' ? (
        <AccordionView 
          searchQuery={searchQuery} 
          selectedPhaseFilter={selectedPhaseFilter} 
        />
      ) : (
        <KanbanView 
          searchQuery={searchQuery} 
          selectedPhaseFilter={selectedPhaseFilter} 
        />
      )}

    </div>
  );
};
