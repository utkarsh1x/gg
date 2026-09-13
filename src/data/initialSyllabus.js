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
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "quants", label: "Quants (Quantitative Logic)", type: "lecture" },
          { key: "spatial", label: "Spatial & Verbal Reasoning", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { quants: false, spatial: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "c-prog",
        name: "C Programming",
        weightage: 4.8,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "pointersArrays", label: "Pointers & Arrays", type: "lecture" },
          { key: "recursion", label: "Recursion & Memory Management", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" }
        ],
        checklist: { pointersArrays: false, recursion: false, solvePYQs: false },
        notes: ""
      },
      {
        id: "discrete-math",
        name: "Discrete Mathematics",
        weightage: 7.5,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "logic", label: "Logic & Set Theory", type: "lecture" },
          { key: "graphTheory", label: "Graph Theory & Combinatorics", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
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
    objective: "Master hardware logic synthesis, data structures, and algorithmic complexities.",
    subjects: [
      {
        id: "digital-logic",
        name: "Digital Logic",
        weightage: 5.7,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "booleanKmaps", label: "Boolean Algebra & K-Maps", type: "lecture" },
          { key: "sequential", label: "Sequential & Combinational Circuits", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { booleanKmaps: false, sequential: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "dsa",
        name: "Data Structures & Algorithms",
        weightage: 12.2,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "arraysTrees", label: "Arrays, Stacks & Trees", type: "lecture" },
          { key: "graphDP", label: "Graph Traversals & Dynamic Programming", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
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
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "faGrammars", label: "Finite Automata & CFG Grammars", type: "lecture" },
          { key: "turing", label: "Turing Machines & Decidability", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { faGrammars: false, turing: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "compiler-design",
        name: "Compiler Design",
        weightage: 6.0,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "parsing", label: "Parsing (LL/LR) & Lexical Analysis", type: "lecture" },
          { key: "sdt", label: "Syntax Directed Translation (SDT)", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
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
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "sql", label: "SQL Queries & ER-Models", type: "lecture" },
          { key: "normalization", label: "Normalization & Functional Dependencies", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { sql: false, normalization: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "operating-systems",
        name: "Operating Systems",
        weightage: 8.3,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "cpuScheduling", label: "CPU Scheduling & Process Management", type: "lecture" },
          { key: "deadlocks", label: "Deadlocks & Memory Paging", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { cpuScheduling: false, deadlocks: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      }
    ]
  },
  {
    phaseId: "phase-5",
    phaseName: "Phase 5: High-Yield",
    timeline: "Jul - Aug 2027",
    objective: "Master Computer Networks core protocol layers and Engineering Mathematics.",
    subjects: [
      {
        id: "computer-networks",
        name: "Computer Networks",
        weightage: 8.3,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "dataLink", label: "Data Link Layer & MAC", type: "lecture" },
          { key: "network", label: "Network Layer & Subnetting", type: "lecture" },
          { key: "transport", label: "Transport Layer (TCP/UDP)", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" },
          { key: "madeEasyTest", label: "Made Easy Test", type: "test" }
        ],
        checklist: { dataLink: false, network: false, transport: false, solvePYQs: false, madeEasyTest: false },
        notes: ""
      },
      {
        id: "engineering-math",
        name: "Engineering Mathematics",
        weightage: 6.5,
        youtubeUrl: "https://www.youtube.com/@AmitKhuranaSir/playlists",
        subTasks: [
          { key: "linearAlgebra", label: "Linear Algebra (Matrices/Eigen)", type: "lecture" },
          { key: "calculus", label: "Calculus (Limits & Maxima)", type: "lecture" },
          { key: "probability", label: "Probability & Statistics", type: "lecture" },
          { key: "solvePYQs", label: "Solve PYQs", type: "pyq" }
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
