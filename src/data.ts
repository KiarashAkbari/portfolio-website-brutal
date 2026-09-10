export type Project = {
  id: string;
  index: string;
  title: string;
  sub: string;
  year: string;
  status: string;
  lang: string;
  stars: number;
  desc: string;
  features: string[];
  stack: string[];
  flow?: string[];
  img?: string;
  fig?: string;
  repo: string;
  live?: string;
};

export const GH = "https://github.com/KiarashAkbari";
export const SITE = "https://kiarash-akbari.netlify.app/";

export const PROJECTS: Project[] = [
  {
    id: "nids",
    index: "01",
    title: "NIDS_FORENSIC_TOOL",
    sub: "ZERO-DAY DOS DETECTION VIA RECONSTRUCTION ERROR",
    year: "2025",
    status: "DEPLOYED_V5",
    lang: "PYTHON",
    stars: 2,
    desc: "A deep-learning Network Intrusion Detection System. Instead of signatures, an autoencoder trains exclusively on benign traffic — any flow that fails to reconstruct cleanly is mathematically hostile. Signature-free defense against zero-day DoS vectors.",
    features: [
      "Real-time TCP/UDP flow aggregation via Scapy",
      "Autoencoder compression core (TensorFlow / Keras)",
      "MSE reconstruction-error decision logic",
      "Log-scale attack vector forensics + CSV reports",
      "Streamlit cloud dashboard with live alerts",
    ],
    stack: ["PYTHON 3.11", "TENSORFLOW", "KERAS", "SCAPY", "STREAMLIT", "PANDAS"],
    flow: [
      "[ SOURCE_DATA ]  .pcap / .csv",
      "      │",
      "      ▼",
      "[ INGESTION ]    Scapy flow-agg + features",
      "      ▼",
      "[ PREPROCESS ]   MinMax norm 0.0 → 1.0",
      "      ▼",
      "[ INFERENCE ]    Autoencoder compression",
      "      ▼",
      "[ DECISION ]     MSE > threshold ⇒ ATTACK",
      "      ▼",
      "[ UI ]           Streamlit dash + alerts",
    ],
    img: "/img/nids.png",
    fig: "AUTOENCODER::CORE — ANOMALY FLAGGED AT 3.2σ",
    repo: `${GH}/NIDS-Forensic-Tool`,
  },
  {
    id: "transit",
    index: "02",
    title: "URBAN_TRANSIT_MESH",
    sub: "OFFLINE-FIRST CITY MAP PIPELINE — WARTIME BUILD",
    year: "2025",
    status: "ACTIVE",
    lang: "PYTHON",
    stars: 0,
    desc: "Built under wartime connectivity constraints. Scrapes, compiles and packages city + transit map data into self-contained offline snapshots, then broadcasts them over Telegram — maps that keep working when the network doesn't.",
    features: [
      "Base-map compiler from raw scraped sources",
      "Offline snapshot generator — zero CDN dependency",
      "Probe + fallback fetchers for degraded networks",
      "Scheduled Telegram broadcast distribution (CI)",
      "Portable builds for disconnected clients",
    ],
    stack: ["PYTHON", "HTTP SCRAPING", "TELEGRAM BOT API", "GITHUB ACTIONS"],
    img: "/img/transit.png",
    fig: "CITY::MESH — OFFLINE SNAPSHOT / NIGHT RENDER",
    repo: `${GH}/urban-transit-mesh`,
  },
  {
    id: "clone1",
    index: "03",
    title: "CLONE-1",
    sub: "HIGH-PERFORMANCE WEB ARCHIVING + MIRRORING",
    year: "2025",
    status: "STABLE",
    lang: "PYTHON",
    stars: 1,
    desc: "A web archiving and mirroring engine with a PyQt6 control room. Playwright-driven stealth crawler extracts deep assets — scripts, styles, media — and reassembles them into fully self-contained local mirrors.",
    features: [
      "Stealth mode: fingerprint rotation + human pacing",
      "Deep asset extraction: JS / CSS / media / fonts",
      "Recursive mirroring with depth + size budgets",
      "PyQt6 GUI: job queue, live logs, profiles",
      "Resumable sessions for long crawl runs",
    ],
    stack: ["PYTHON", "PLAYWRIGHT", "PYQT6", "ASYNC IO"],
    img: "/img/clone1.png",
    fig: "MIRROR::CASCADE — RECURSIVE ASSET EXTRACTION",
    repo: `${GH}/CLONE-1`,
  },
  {
    id: "notetaker",
    index: "04",
    title: "NOTE-TAKER",
    sub: "VANILLA JS OPS CONSOLE — ZERO DEPENDENCIES",
    year: "2024",
    status: "SHIPPED",
    lang: "JAVASCRIPT",
    stars: 2,
    desc: "A personal ops console for notes, tasks and progress tracking in a TE-inspired dark phosphor UI. No framework, no build step, no backend — every byte of state lives in localStorage.",
    features: [
      "Pure HTML / CSS / ES6+ — zero dependencies",
      "localStorage-backed persistence layer",
      "Task progress + organization workflows",
      "Keyboard-first, TE-inspired dark interface",
    ],
    stack: ["HTML", "CSS", "JAVASCRIPT", "LOCALSTORAGE"],
    img: "/img/notes.png",
    fig: "PHOSPHOR::UI — PERSISTENT STATE, NO BACKEND",
    repo: `${GH}/NOTE-TAKER`,
  },
  {
    id: "portfolio",
    index: "05",
    title: "KIA.SYS — THIS SITE",
    sub: "BRUTALIST DOSSIER W/ LIVE ASCII RENDERER",
    year: "2026",
    status: "YOU_ARE_HERE",
    lang: "TYPESCRIPT",
    stars: 0,
    desc: "This document. An experiment in brutalist engineering aesthetics: a live ASCII-rendered point-cloud core, dot-matrix decoded imagery, blueprint chrome and monospaced truth — experimental but still readable.",
    features: [
      "Custom canvas 3D → ASCII renderer",
      "Dot-matrix image decoding effects",
      "Blueprint UI system + engineering chrome",
    ],
    stack: ["REACT", "TYPESCRIPT", "TAILWIND", "CANVAS"],
    repo: `${GH}/my-portfolio`,
    live: SITE,
  },
];

export const TICKER_ITEMS = [
  "DEEP LEARNING",
  "ANOMALY DETECTION",
  "AUTOENCODERS",
  "SYSTEMS ENGINEERING",
  "STEALTH SCRAPING",
  "OFFLINE PIPELINES",
  "NETWORK FORENSICS",
  "TENSORFLOW / KERAS",
  "PYTHON / TYPESCRIPT",
  "SIGNAL > NOISE",
];

export const CAPABILITIES = [
  {
    group: "MODEL://",
    rows: [
      ["DEEP LEARNING", 0.9],
      ["AUTOENCODERS", 0.88],
      ["ANOMALY DETECTION", 0.86],
      ["DATA FORENSICS", 0.82],
    ],
  },
  {
    group: "SYSTEM://",
    rows: [
      ["SCRAPING INFRA", 0.92],
      ["OFFLINE PIPELINES", 0.86],
      ["AUTOMATION / CI", 0.84],
      ["GUI TOOLING", 0.78],
    ],
  },
  {
    group: "LANG://",
    rows: [
      ["PYTHON", 0.94],
      ["JAVASCRIPT", 0.82],
      ["TYPESCRIPT", 0.72],
      ["SQL", 0.7],
    ],
  },
];

export const TIMELINE = [
  ["2024.01", "GIT_INIT", "First public commit — the lab goes online."],
  ["2024", "NOTE_TAKER", "Shipped zero-dependency ops console. Vanilla by choice."],
  ["2025", "NIDS_V5", "Autoencoder NIDS deployed — zero-day DoS via MSE anomaly."],
  ["2025", "CLONE-1", "Stealth archiving engine w/ PyQt6 control room."],
  ["2026.NOW", "KIA.SYS", "This dossier. Open to AI / engineering roles."],
];

export const NAV_LINKS = [
  ["01", "INDEX", "#hero"],
  ["02", "WORK", "#work"],
  ["03", "PROFILE", "#profile"],
  ["04", "SIGNAL", "#signal"],
] as const;
