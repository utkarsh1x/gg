export const initialSyllabusData = [
  {
    phaseId: "phase-1",
    phaseName: "Phase 1: Foundation",
    timeline: "Sept - Nov 2026",
    objective: "Establish core aptitude, programming syntax, and mathematical foundations.",
    subjects: [
      {
        id: "aptitude",
        name: "General Aptitude",
        weightage: 15.0,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+General+Aptitude+Full+Playlist+GATE",
        subTasks: [
          { key: "quants", label: "Quants (Quantitative Logic)", type: "lecture", videoQuery: "Amit Khurana General Aptitude Quantitative Logic Playlist GATE" },
          { key: "spatial", label: "Spatial & Verbal Reasoning", type: "lecture", videoQuery: "Amit Khurana General Aptitude Spatial Reasoning Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana General Aptitude PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { quants: false, spatial: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "c-prog",
        name: "C Programming",
        weightage: 4.8,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+C+Language+Full+Playlist+GATE",
        subTasks: [
          { key: "pointersArrays", label: "Pointers & Arrays", type: "lecture", videoQuery: "Amit Khurana C Programming Pointers Arrays Playlist GATE" },
          { key: "recursion", label: "Recursion & Memory Management", type: "lecture", videoQuery: "Amit Khurana C Programming Recursion Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana C Programming PYQs GATE" }
        ],
        checklist: { pointersArrays: false, recursion: false, solvePYQs: false },
        notes: ""
      },
      {
        id: "discrete-math",
        name: "Discrete Mathematics",
        weightage: 7.5,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+Discrete+Mathematics+Full+Playlist+GATE",
        subTasks: [
          { key: "logic", label: "Logic & Set Theory", type: "lecture", videoQuery: "Amit Khurana Discrete Mathematics Propositional Logic Playlist GATE" },
          { key: "graphTheory", label: "Graph Theory & Combinatorics", type: "lecture", videoQuery: "Amit Khurana Discrete Mathematics Graph Theory Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana Discrete Mathematics PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { logic: false, graphTheory: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      }
    ]
  },
  {
    phaseId: "phase-2",
    phaseName: "Phase 2: Core Hardware & Algorithms",
    timeline: "Dec 2026 - Feb 2027",
    objective: "Master hardware architecture, computer organization, data structures, and algorithms.",
    subjects: [
      {
        id: "digital-logic",
        name: "Digital Logic",
        weightage: 5.7,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+Digital+Logic+Full+Playlist+GATE",
        subTasks: [
          { key: "booleanKmaps", label: "Boolean Algebra & K-Maps", type: "lecture", videoQuery: "Amit Khurana Digital Logic Boolean Algebra K Maps Playlist GATE" },
          { key: "sequential", label: "Sequential & Combinational Circuits", type: "lecture", videoQuery: "Amit Khurana Digital Logic Sequential Circuits Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana Digital Logic PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { booleanKmaps: false, sequential: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "coa",
        name: "Computer Organization & Architecture (COA)",
        weightage: 9.7,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+Computer+Organization+Architecture+COA+Full+Playlist+GATE",
        subTasks: [
          { key: "machineInstructions", label: "Machine Instructions", type: "lecture", videoQuery: "Amit Khurana COA Machine Instructions Addressing Modes Playlist GATE" },
          { key: "pipelining", label: "Pipelining", type: "lecture", videoQuery: "Amit Khurana COA Pipelining ALU Playlist GATE" },
          { key: "cacheMemory", label: "Cache & Memory", type: "lecture", videoQuery: "Amit Khurana COA Cache Memory Organization Playlist GATE" },
          { key: "ioInterfaces", label: "I/O Interfaces", type: "lecture", videoQuery: "Amit Khurana COA IO Interfaces DMA Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana COA PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { machineInstructions: false, pipelining: false, cacheMemory: false, ioInterfaces: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "dsa",
        name: "Data Structures & Algorithms",
        weightage: 12.2,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+DSA+Data+Structures+Algorithms+Full+Playlist+GATE",
        subTasks: [
          { key: "arraysTrees", label: "Arrays, Stacks & Trees", type: "lecture", videoQuery: "Amit Khurana Data Structures Arrays Stacks Trees Playlist GATE" },
          { key: "graphDP", label: "Graph Traversals & Dynamic Programming", type: "lecture", videoQuery: "Amit Khurana Algorithms Graph Traversals Dynamic Programming Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana DSA PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { arraysTrees: false, graphDP: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      }
    ]
  },
  {
    phaseId: "phase-3",
    phaseName: "Phase 3: Theoretical Core",
    timeline: "Mar - Apr 2027",
    objective: "Master Theory of Computation automata and Compiler Design translation pipelines.",
    subjects: [
      {
        id: "toc",
        name: "Theory of Computation",
        weightage: 8.3,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+Theory+of+Computation+TOC+Full+Playlist+GATE",
        subTasks: [
          { key: "faGrammars", label: "Finite Automata & CFG Grammars", type: "lecture", videoQuery: "Amit Khurana TOC Finite Automata CFG Playlist GATE" },
          { key: "turing", label: "Turing Machines & Decidability", type: "lecture", videoQuery: "Amit Khurana TOC Turing Machines Decidability Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana TOC PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { faGrammars: false, turing: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "compiler-design",
        name: "Compiler Design",
        weightage: 6.0,
        youtubeUrl: "https://www.youtube.com/results?search_query=NIR+BHAU+Series+Compiler+Design+Amit+Khurana+Playlist",
        subTasks: [
          { key: "parsing", label: "Parsing (LL/LR) & Lexical Analysis", type: "lecture", videoQuery: "NIR BHAU Series Compiler Design Parsing Playlist GATE" },
          { key: "sdt", label: "Syntax Directed Translation (SDT)", type: "lecture", videoQuery: "NIR BHAU Series Compiler Design SDT Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana Compiler Design PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { parsing: false, sdt: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      }
    ]
  },
  {
    phaseId: "phase-4",
    phaseName: "Phase 4: Applied Systems",
    timeline: "May - Jun 2027",
    objective: "Build high-yield practical skills in DBMS storage and OS process execution.",
    subjects: [
      {
        id: "dbms",
        name: "DBMS",
        weightage: 7.0,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+Databases+DBMS+Full+Playlist+GATE",
        subTasks: [
          { key: "sql", label: "SQL Queries & ER-Models", type: "lecture", videoQuery: "Amit Khurana DBMS SQL Queries ER Models Playlist GATE" },
          { key: "normalization", label: "Normalization & Functional Dependencies", type: "lecture", videoQuery: "Amit Khurana DBMS Normalization Functional Dependencies Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana DBMS PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { sql: false, normalization: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "operating-systems",
        name: "Operating Systems",
        weightage: 8.3,
        youtubeUrl: "https://www.youtube.com/results?search_query=OS+NIR+BHAU+Series+Amit+Khurana+Full+Playlist+GATE",
        subTasks: [
          { key: "cpuScheduling", label: "CPU Scheduling & Process Management", type: "lecture", videoQuery: "NIR BHAU OS Series CPU Scheduling Playlist GATE" },
          { key: "deadlocks", label: "Deadlocks & Memory Paging", type: "lecture", videoQuery: "NIR BHAU OS Series Deadlocks Memory Paging Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana Operating Systems PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { cpuScheduling: false, deadlocks: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      }
    ]
  },
  {
    phaseId: "phase-5",
    phaseName: "Phase 5: High-Yield & Full Coverage",
    timeline: "Jul - Aug 2027",
    objective: "Cover complete 100% Computer Networks protocol layers and Engineering Mathematics.",
    subjects: [
      {
        id: "computer-networks",
        name: "Computer Networks",
        weightage: 8.3,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+Computer+Networks+CN+Full+Playlist+GATE",
        subTasks: [
          { key: "dataLink", label: "Data Link Layer & MAC", type: "lecture", videoQuery: "Amit Khurana Computer Networks Data Link Layer Playlist GATE" },
          { key: "network", label: "Network Layer & Subnetting", type: "lecture", videoQuery: "Amit Khurana Computer Networks Network Layer Subnetting Playlist GATE" },
          { key: "transport", label: "Transport Layer (TCP/UDP)", type: "lecture", videoQuery: "Amit Khurana Computer Networks Transport Layer Playlist GATE" },
          { key: "appSecurity", label: "Application Layer & Security", type: "lecture", videoQuery: "Amit Khurana Computer Networks Application Layer Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana Computer Networks PYQs GATE" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { dataLink: false, network: false, transport: false, appSecurity: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "engineering-math",
        name: "Engineering Mathematics",
        weightage: 6.5,
        youtubeUrl: "https://www.youtube.com/results?search_query=Amit+Khurana+Engineering+Mathematics+Full+Playlist+GATE",
        subTasks: [
          { key: "linearAlgebra", label: "Linear Algebra (Matrices/Eigen)", type: "lecture", videoQuery: "Amit Khurana Engineering Mathematics Linear Algebra Playlist GATE" },
          { key: "calculus", label: "Calculus (Limits & Maxima)", type: "lecture", videoQuery: "Amit Khurana Engineering Mathematics Calculus Playlist GATE" },
          { key: "probability", label: "Probability & Statistics", type: "lecture", videoQuery: "Amit Khurana Engineering Mathematics Probability Playlist GATE" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq", videoQuery: "Amit Khurana Engineering Mathematics PYQs GATE" }
        ],
        checklist: { linearAlgebra: false, calculus: false, probability: false, solvePYQs: false },
        notes: ""
      }
    ]
  }
];

export const isSubject100PercentComplete = (subject) => {
  const checklist = subject.checklist || {};
  const keys = Object.keys(checklist);
  if (keys.length === 0) return false;

  const allChecked = keys.every(k => checklist[k] === true);
  const pyqDone = checklist.solvePYQs !== undefined ? checklist.solvePYQs === true : true;
  const testDone = checklist.madeEasyTest !== undefined ? checklist.madeEasyTest === true : true;

  return allChecked && pyqDone && testDone;
};
