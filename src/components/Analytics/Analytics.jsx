import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { isSubject100PercentComplete } from '../../data/initialSyllabus';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Analytics = () => {
  const { syllabus, metrics } = usePlanner();

  // Prepare data for Subject Weightage vs Completion Bar Chart
  const subjectChartData = [];
  syllabus.forEach(phase => {
    phase.subjects.forEach(subj => {
      const checks = Object.values(subj.checklist || {});
      const totalChecks = checks.length;
      const checkedCount = checks.filter(Boolean).length;
      const percent = totalChecks > 0 ? Math.round((checkedCount / totalChecks) * 100) : 0;
      const isMastered = isSubject100PercentComplete(subj);

      if (subj.weightage > 0) {
        subjectChartData.push({
          name: subj.name.split('(')[0].trim(),
          weightage: subj.weightage,
          completion: percent,
          isMastered,
          coveredMarks: Math.round((percent / 100) * subj.weightage * 10) / 10
        });
      }
    });
  });

  // Prepare data for Phase Completion Share Donut Chart
  const phaseChartData = syllabus.map(phase => {
    let totalChecks = 0;
    let checkedCount = 0;
    phase.subjects.forEach(subj => {
      const checks = Object.values(subj.checklist || {});
      totalChecks += checks.length;
      checkedCount += checks.filter(Boolean).length;
    });
    const percent = totalChecks > 0 ? Math.round((checkedCount / totalChecks) * 100) : 0;
    return {
      name: phase.phaseName.split(':')[0],
      fullName: phase.phaseName,
      value: percent === 0 ? 5 : percent, // minimum slice for visual layout
      actualValue: percent
    };
  });

  const COLORS = ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

  const rankTable = [
    { marks: '85+', rank: '1 - 10', outcome: 'Elite Performance • Guaranteed PSU & Top IITs' },
    { marks: '75 - 80', rank: '10 - 50', outcome: 'Highly Competitive for Top IITs (Bombay, Madras, Delhi)' },
    { marks: '65 - 70', rank: '200 - 500', outcome: 'Strong Probability for Mid-tier IITs / Top NITs' },
    { marks: '55 - 60', rank: '1000 - 2000', outcome: 'Acceptable for NITs & Top State Universities' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold">Preparation Analytics & Weightage Analysis</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time data insights mapping your completed checklist sub-tasks to GATE marks & AIR predictions.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Marks Covered</span>
          <div className="text-2xl font-black text-cyan-400">
            {metrics.coveredWeightage} <span className="text-xs text-slate-400 font-normal">/ 80</span>
          </div>
        </div>
      </div>

      {/* Chart Grid: Bar Chart + Phase Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Subject Weightage vs Progress Bar Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-500" />
                Subject Weightage vs Checklist Completion %
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                GATE Average Weightage Marks per Subject (Out of 100)
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -20, bottom: 45 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#94a3b8', fontSize: 10 }} 
                  interval="preserveStartEnd" 
                  minTickGap={24}
                  angle={-35} 
                  textAnchor="end" 
                  height={50}
                />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 16]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value, name) => [
                    name === 'weightage' ? `${value} Marks` : `${value}%`,
                    name === 'weightage' ? 'GATE Weightage' : 'Completion'
                  ]}
                />
                <Bar dataKey="weightage" fill="#0284c7" radius={[6, 6, 0, 0]}>
                  {subjectChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phase Completion Share Donut Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 mb-1">
              <PieIcon className="w-4 h-4 text-indigo-500" />
              Phase Progress Share
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Relative completion share across all 5 Roadmap Phases
            </p>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={phaseChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {phaseChartData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val, name, item) => [`${item.payload.actualValue}%`, 'Completion']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            {phaseChartData.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                  {p.fullName}
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{p.actualValue}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Historical Mark-to-Rank Correlation Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Historical Mark-to-Rank Correlation Blueprint
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Based on historical GATE CSE 2023-2025 cutoff data
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Goal Threshold: 65+ Marks
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="py-3 px-4">GATE CSE Marks (Out of 100)</th>
                <th className="py-3 px-4">Expected AIR Range</th>
                <th className="py-3 px-4">Admission / PSU Recruitment Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {rankTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-black text-cyan-600 dark:text-cyan-400 font-mono text-sm">
                    {row.marks} Marks
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    AIR {row.rank}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {row.outcome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
