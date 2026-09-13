import React from 'react';
import { PlannerProvider, usePlanner } from './context/PlannerContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { DailySchedule } from './components/Schedule/DailySchedule';
import { SyllabusTracker } from './components/Syllabus/SyllabusTracker';
import { Analytics } from './components/Analytics/Analytics';

const MainContent = () => {
  const { activeTab } = usePlanner();

  return (
    <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-8 max-w-7xl mx-auto w-full transition-all duration-200">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'schedule' && <DailySchedule />}
      {activeTab === 'syllabus' && <SyllabusTracker />}
      {activeTab === 'analytics' && <Analytics />}
    </main>
  );
};

export default function App() {
  return (
    <PlannerProvider>
      <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
        <Header />
        <div className="flex-1 flex flex-col md:flex-row">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </PlannerProvider>
  );
}
