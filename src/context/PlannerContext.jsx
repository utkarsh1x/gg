import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSyllabusData, isSubject100PercentComplete } from '../data/initialSyllabus';
import { weekdaySchedule, weekendSchedule } from '../data/initialSchedule';
import confetti from 'canvas-confetti';

const PlannerContext = createContext();

const STORAGE_KEYS = {
  SYLLABUS: 'gate2028_syllabus_v5', // v5 for topic-specific playlist queries
  SCHEDULE_WD: 'gate2028_schedule_wd_v1',
  SCHEDULE_WE: 'gate2028_schedule_we_v1',
  STREAKS: 'gate2028_streaks_v1',
  TODAY_FOCUS: 'gate2028_focus_v3',
  THEME: 'gate2028_theme_v1'
};

export const PlannerProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const [syllabus, setSyllabus] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SYLLABUS);
    return saved ? JSON.parse(saved) : initialSyllabusData;
  });

  const [weekdayBlocks, setWeekdayBlocks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE_WD);
    return saved ? JSON.parse(saved) : weekdaySchedule;
  });

  const [weekendBlocks, setWeekendBlocks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE_WE);
    return saved ? JSON.parse(saved) : weekendSchedule;
  });

  const [streakLogs, setStreakLogs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STREAKS);
    if (saved) return JSON.parse(saved);
    
    const today = new Date();
    const seed = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (i !== 2 && i !== 6) {
        seed[dateStr] = true;
      }
    }
    return seed;
  });

  const [todayFocus, setTodayFocus] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TODAY_FOCUS);
    return saved ? JSON.parse(saved) : {
      subjectId: 'coa',
      subjectName: 'Computer Organization & Architecture (COA)'
    };
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SYLLABUS, JSON.stringify(syllabus));
  }, [syllabus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE_WD, JSON.stringify(weekdayBlocks));
    localStorage.setItem(STORAGE_KEYS.SCHEDULE_WE, JSON.stringify(weekendBlocks));
  }, [weekdayBlocks, weekendBlocks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAKS, JSON.stringify(streakLogs));
  }, [streakLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TODAY_FOCUS, JSON.stringify(todayFocus));
  }, [todayFocus]);

  const toggleChecklist = (phaseId, subjectId, checkKey) => {
    setSyllabus(prevSyllabus => {
      let preventToggle = false;
      
      for (const phase of prevSyllabus) {
        if (phase.phaseId === phaseId) {
          const subject = phase.subjects.find(s => s.id === subjectId);
          if (subject) {
            if (checkKey === 'madeEasyTest' && !subject.checklist.madeEasyTest) {
              if (!subject.checklist.solvePYQs) {
                alert("Warning: Do not attempt the test series until PYQs are fully solved!");
                preventToggle = true;
                break;
              }
            }
          }
        }
      }

      if (preventToggle) return prevSyllabus;

      let isNow100Complete = false;
      const updated = prevSyllabus.map(phase => {
        if (phase.phaseId !== phaseId) return phase;
        
        return {
          ...phase,
          subjects: phase.subjects.map(subject => {
            if (subject.id !== subjectId) return subject;

            const newChecklist = {
              ...subject.checklist,
              [checkKey]: !subject.checklist[checkKey]
            };

            const updatedSubject = { ...subject, checklist: newChecklist };
            const wasComplete = isSubject100PercentComplete(subject);
            const isComplete = isSubject100PercentComplete(updatedSubject);

            if (isComplete && !wasComplete) {
              isNow100Complete = true;
            }

            return updatedSubject;
          })
        };
      });

      if (isNow100Complete) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      return updated;
    });
  };

  const updateSubjectNotes = (phaseId, subjectId, notes) => {
    setSyllabus(prevSyllabus => 
      prevSyllabus.map(phase => {
        if (phase.phaseId !== phaseId) return phase;
        return {
          ...phase,
          subjects: phase.subjects.map(subj => {
            if (subj.id !== subjectId) return subj;
            return { ...subj, notes };
          })
        };
      })
    );
  };

  const toggleStreakDate = (dateStr) => {
    setStreakLogs(prev => {
      const next = { ...prev };
      if (next[dateStr]) {
        delete next[dateStr];
      } else {
        next[dateStr] = true;
      }
      return next;
    });
  };

  const toggleScheduleBlock = (isWeekend, blockId) => {
    if (isWeekend) {
      setWeekendBlocks(prev =>
        prev.map(b => b.id === blockId ? { ...b, completed: !b.completed } : b)
      );
    } else {
      setWeekdayBlocks(prev =>
        prev.map(b => b.id === blockId ? { ...b, completed: !b.completed } : b)
      );
    }
  };

  const calculateMetrics = () => {
    let totalChecklistItems = 0;
    let completedChecklistItems = 0;
    let totalWeightage = 0;
    let coveredWeightage = 0;
    let totalSubjects = 0;
    let completedSubjects = 0;

    syllabus.forEach(phase => {
      phase.subjects.forEach(subj => {
        totalSubjects++;
        totalWeightage += subj.weightage || 0;

        const checks = Object.values(subj.checklist);
        const checkedCount = checks.filter(Boolean).length;

        totalChecklistItems += checks.length;
        completedChecklistItems += checkedCount;

        const is100Done = isSubject100PercentComplete(subj);

        if (is100Done) {
          completedSubjects++;
        }

        if (checks.length > 0) {
          const ratio = checkedCount / checks.length;
          coveredWeightage += (subj.weightage || 0) * ratio;
        }
      });
    });

    const overallPercentage = totalChecklistItems > 0
      ? Math.round((completedChecklistItems / totalChecklistItems) * 100)
      : 0;

    return {
      overallPercentage,
      completedChecklistItems,
      totalChecklistItems,
      totalWeightage,
      coveredWeightage: Math.min(100, Math.round(coveredWeightage * 10) / 10),
      totalSubjects,
      completedSubjects
    };
  };

  const calculateCurrentStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (streakLogs[dateStr]) {
        streak++;
      } else if (i === 0) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  };

  const metrics = calculateMetrics();
  const currentStreak = calculateCurrentStreak();

  const resetAllData = () => {
    if (window.confirm("Reset all GATE progress data to initial roadmap values?")) {
      setSyllabus(initialSyllabusData);
      setWeekdayBlocks(weekdaySchedule);
      setWeekendBlocks(weekendSchedule);
      localStorage.clear();
      setTheme('dark');
    }
  };

  const exportData = () => {
    const data = {
      syllabus,
      weekdayBlocks,
      weekendBlocks,
      streakLogs,
      todayFocus,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GATE_CSE_2028_Roadmap_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonObj) => {
    try {
      if (jsonObj.syllabus) setSyllabus(jsonObj.syllabus);
      if (jsonObj.weekdayBlocks) setWeekdayBlocks(jsonObj.weekdayBlocks);
      if (jsonObj.weekendBlocks) setWeekendBlocks(jsonObj.weekendBlocks);
      if (jsonObj.streakLogs) setStreakLogs(jsonObj.streakLogs);
      if (jsonObj.todayFocus) setTodayFocus(jsonObj.todayFocus);
      alert("Roadmap progress successfully imported!");
    } catch (e) {
      alert("Failed to import data.");
    }
  };

  return (
    <PlannerContext.Provider
      value={{
        theme,
        setTheme,
        activeTab,
        setActiveTab,
        syllabus,
        toggleChecklist,
        updateSubjectNotes,
        weekdayBlocks,
        weekendBlocks,
        toggleScheduleBlock,
        streakLogs,
        toggleStreakDate,
        todayFocus,
        setTodayFocus,
        metrics,
        currentStreak,
        resetAllData,
        exportData,
        importData
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => useContext(PlannerContext);
