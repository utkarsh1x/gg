export const weekdaySchedule = [
  {
    id: "w1",
    timeBlock: "06:00 AM - 07:00 AM",
    title: "Morning Active Recall & PYQs",
    color: "green", // Green
    isDisabled: false,
    strategy: "Fresh brain focus. Reserved exclusively for active problem solving, derivations, and solving GATE PYQs.",
    completed: false
  },
  {
    id: "w2",
    timeBlock: "08:00 AM - 05:00 PM",
    title: "College Classes",
    color: "gray", // Gray / Disabled
    isDisabled: true,
    strategy: "Mandatory undergraduate college attendance. Blocked out — cannot schedule study tasks during college hours.",
    completed: false
  },
  {
    id: "w3",
    timeBlock: "05:00 PM - 07:00 PM",
    title: "Travel, Rest, Dinner",
    color: "yellow", // Yellow
    isDisabled: false,
    strategy: "Critical neural decoupling and recovery phase. Commute, relaxation, and dinner before the evening study block.",
    completed: false
  },
  {
    id: "w4",
    timeBlock: "07:00 PM - 09:30 PM",
    title: "Amit Khurana Lectures + Notes",
    color: "blue", // Blue
    isDisabled: false,
    strategy: "Core video lecture consumption at 1.25x-1.5x speed. Take structured handwritten notes and formula cards.",
    completed: false
  },
  {
    id: "w5",
    timeBlock: "09:30 PM - 10:30 PM",
    title: "Daily Revision",
    color: "purple", // Purple
    isDisabled: false,
    strategy: "Consolidate today's learnings. Review formula flashcards, error logs, and plan tomorrow's focus.",
    completed: false
  }
];

export const weekendSchedule = [
  {
    id: "we1",
    timeBlock: "07:00 AM - 10:00 AM",
    title: "Deep Concept Synthesis & Marathon Lectures",
    color: "blue",
    isDisabled: false,
    hours: "3.0 Hours",
    strategy: "Uninterrupted deep focus on high-weightage topics and playlist marathons.",
    completed: false
  },
  {
    id: "we2",
    timeBlock: "10:00 AM - 11:00 AM",
    title: "Extended Rest & Breakfast",
    color: "yellow",
    isDisabled: false,
    hours: "1.0 Hour",
    strategy: "Refuel and mental reset before test simulations.",
    completed: false
  },
  {
    id: "we3",
    timeBlock: "11:00 AM - 01:00 PM",
    title: "Made Easy Topic Tests & Exam Simulation",
    color: "green",
    isDisabled: false,
    hours: "2.0 Hours",
    strategy: "Simulate real exam conditions during forenoon session. Take topic-wise & single subject tests.",
    completed: false
  },
  {
    id: "we4",
    timeBlock: "01:00 PM - 03:00 PM",
    title: "Lunch & Half-Day Relaxation",
    color: "yellow",
    isDisabled: false,
    hours: "2.0 Hours",
    strategy: "Mandatory downtime, lunch, and mental recovery to prevent burnout.",
    completed: false
  },
  {
    id: "we5",
    timeBlock: "03:00 PM - 06:00 PM",
    title: "PYQ Marathon & Numerical Problem Solving",
    color: "purple",
    isDisabled: false,
    hours: "3.0 Hours",
    strategy: "Solve 2-mark GATE questions and NAT numerical drills in exam conditions.",
    completed: false
  },
  {
    id: "we6",
    timeBlock: "07:00 PM - 09:30 PM",
    title: "Error Log Analysis & Past 7-Days Revision",
    color: "blue",
    isDisabled: false,
    hours: "2.5 Hours",
    strategy: "Review missed questions from Made Easy tests, log errors, and revise previous 7 days' formulas.",
    completed: false
  }
];

export const weekendStickyNotes = [
  {
    id: "note-sat",
    day: "Saturday Reminder",
    title: "Saturday: Past 7-Days Revision & Marathon Lectures",
    bgColor: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200",
    iconColor: "text-amber-500",
    bulletPoints: [
      "Revise all formula flashcards created during the past 7 days.",
      "Watch extended Amit Khurana lecture marathons for complex topics.",
      "Clear pending lecture backlog before Sunday tests."
    ]
  },
  {
    id: "note-sun",
    day: "Sunday Reminder",
    title: "Sunday: Made Easy Topic Tests & Half-Day Relaxation",
    bgColor: "bg-cyan-500/10 dark:bg-cyan-500/15 border-cyan-500/40 text-cyan-900 dark:text-cyan-200",
    iconColor: "text-cyan-500",
    bulletPoints: [
      "Attempt Made Easy online topic-wise and subject tests (11 AM - 1 PM).",
      "Thoroughly analyze test report and log every wrong question into the error book.",
      "Enforce mandatory half-day relaxation (1 PM - 3 PM) to refresh for the upcoming week."
    ]
  }
];
