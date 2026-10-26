// All portfolio content lives here. Edit this file to update the site.
// To add a project: copy an entry in `projects` and change the text. The
// workflow diagram and graph view are drawn from `flow` and `uses`.

export const profile = {
  name: "Taha Umar",
  firstName: "Taha",
  role: "Lead AI/ML Engineer",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "dev.tahaumar09@gmail.com",
  linkedin: "https://www.linkedin.com/in/tahaumar/",
  photo: "/taha.png",
  headline: "I build AI agents that hold up in production.",
  intro:
    "Lead AI/ML Engineer with 6+ years taking AI from first idea to dependable production systems: multi-agent orchestration, RAG, and the evals and tracing that keep them honest.",
};

export const stats = [
  { value: 6, suffix: "+", label: "Years shipping ML to production" },
  { value: 4, suffix: "", label: "Industries: fintech, healthcare, hospitality, SaaS" },
  { value: 5, suffix: "", label: "Regions of clients and teams" },
  { value: 2, suffix: "", label: "Clouds in production: AWS and Azure" },
];

export const about = {
  paragraphs: [
    "Most AI projects die somewhere between the demo and production. The prototype works on ten documents. Then real users arrive: answers that sound right but aren't, failures nobody can trace, and a compliance team asking how the model reached its conclusion.",
    "I'm Taha Umar, a Lead AI/ML Engineer. For 6+ years I've taken AI products from early concept to systems people rely on, across fintech, healthcare, hospitality and SaaS.",
    "I started with classical machine learning and computer vision: pricing models, recommenders, YOLO pipelines. I grew into generative AI, and today I lead work on multi-agent systems with LangGraph and MCP, RAG with hybrid retrieval, and LLM evaluation and observability.",
    "What I've learned: the LLM is the easy part. The hard part is the retrieval it depends on, the data pipelines that feed it, the evals that catch regressions, and the traces that tell you why it failed at 2am.",
    "So I build all of it, with founders and distributed teams across the US, Canada, Europe, Singapore and the Middle East.",
  ],
  outcomes: [
    "Agents that automate financial workflows and regulatory checks",
    "RAG assistants that answer from your documents, not from guesses",
    "Data pipelines on Airflow, Spark, Kafka and dbt that feed the models",
    "LLMOps: prompt versioning, evals, tracing and guardrails on every run",
  ],
};

export type Role = {
  company: string;
  title: string;
  period: string;
  place: string;
  type: string;
  art: "prism" | "maple" | "pulse" | "lens" | "grad";
  /** Optional disc artwork in /public/experience. "cover" fills the disc; "logo" prints it like a CD label. */
  image?: { src: string; fit: "cover" | "logo"; bg?: string };
  stack: string[];
  highlights: { label: string; text: string }[];
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Techprysm",
    title: "Lead AI/ML Engineer",
    period: "Jul 2025 – Present",
    place: "United States · Remote",
    type: "Contract",
    art: "prism",
    stack: ["LangGraph", "MCP", "Airflow", "dbt", "Kubernetes"],
    highlights: [
      { label: "Multi-agent systems", text: "Agents that run financial checks end to end" },
      { label: "LLMOps", text: "Every run traced, evaluated, guarded" },
    ],
    points: [
      "Direct ML architecture, generative AI integrations and model performance across client products.",
      "Design multi-agent systems with LangGraph, LangChain and MCP that automate financial workflows and regulatory checks.",
      "Architect a multi-tenant SaaS analytics platform: PostgreSQL, Airflow + dbt ELT, Celery + Redis jobs, AI-generated insights.",
      "Set up LLMOps: prompt versioning, automated evals, LangSmith + Langfuse tracing, guardrails; ship on Docker, Kubernetes and AWS.",
    ],
  },
  {
    company: "Canada Inc.",
    title: "Senior AI/ML Consultant",
    period: "Dec 2024 – Jun 2025",
    place: "Ontario, Canada · Remote",
    type: "Contract",
    art: "maple",
    image: { src: "/experience/kangaroo.png", fit: "cover" },
    stack: ["MLflow", "Docker", "Kubernetes", "CI/CD"],
    highlights: [
      { label: "Enterprise MLOps", text: "Training to deployment, one pipeline" },
      { label: "Model audits", text: "Accuracy, drift and latency, fixed" },
    ],
    points: [
      "Delivered specialized AI models for enterprise clients, from problem framing and training to deployment.",
      "Streamlined MLOps pipelines for training, versioning and deployment with MLflow, Docker, Kubernetes and CI/CD.",
      "Ran model performance audits on accuracy, drift and latency, and turned findings into retraining plans.",
    ],
  },
  {
    company: "Core Edge Solutions",
    title: "Senior ML Engineer",
    period: "Feb 2023 – Nov 2024",
    place: "Lahore · Hybrid",
    type: "Full-time",
    art: "pulse",
    image: { src: "/experience/core-edge.png", fit: "logo", bg: "#ececec" },
    stack: ["LlamaIndex", "pgvector", "Elasticsearch", "Kafka", "SageMaker"],
    highlights: [
      { label: "Healthcare RAG", text: "Grounded answers from medical documents" },
      { label: "Data pipelines", text: "Batch and streaming into Snowflake" },
    ],
    points: [
      "Built a production generative AI assistant for healthcare on RAG with hybrid search and reranking.",
      "Built ingestion, chunking, embedding and retrieval pipelines with LangChain, LlamaIndex, pgvector and Elasticsearch.",
      "Engineered batch and streaming pipelines with Airflow, PySpark and Kafka into Snowflake and PostgreSQL.",
      "Served models through FastAPI on AWS and Azure; tracked experiments and drift with MLflow, DVC and SageMaker.",
    ],
  },
  {
    company: "GenITeam Solutions",
    title: "Associate → AI/ML Engineer",
    period: "Sep 2020 – Jan 2023",
    place: "Lahore · On-site",
    type: "Full-time",
    art: "lens",
    image: { src: "/experience/geniteam.png", fit: "logo", bg: "#f4f4f4" },
    stack: ["OpenCV", "YOLO", "XGBoost", "Keras", "Flask"],
    highlights: [
      { label: "Computer vision", text: "Guest processing with YOLO" },
      { label: "Pricing & RecSys", text: "Models that move revenue" },
    ],
    points: [
      "Built recommendation systems and dynamic pricing models for hospitality products.",
      "Developed computer vision workflows for guest processing with OpenCV, YOLO and TensorFlow.",
      "Created ETL pipelines from MySQL and MongoDB and engineered features for core models.",
      "Promoted from Associate to AI/ML Engineer, owning model development and delivery.",
    ],
  },
  {
    company: "FAST-NUCES",
    title: "BS Computer Science",
    period: "2016 – 2020",
    place: "Lahore",
    type: "Education",
    art: "grad",
    image: { src: "/experience/fast.png", fit: "logo", bg: "#f7f7f7" },
    stack: ["C++", "Python", "Algorithms"],
    highlights: [
      { label: "SOFTEC", text: "Winner, programming competition" },
      { label: "Leadership", text: "Head of the SOFTEC AI event" },
    ],
    points: ["Head of the SOFTEC AI event.", "Winner, SOFTEC Programming Competition."],
  },
];

/* "How I got here" story. Each chapter draws a scene on the horizon. */
export const story = [
  {
    place: "FAST-NUCES · 2016 – 2020",
    title: ["I started with a keyboard", "and a competition."],
    text: "Computer science in Lahore. I ran the SOFTEC AI event, and won the SOFTEC programming competition.",
    scene: "laptop",
  },
  {
    place: "GenITeam · 2020",
    title: ["I taught cameras", "to see guests."],
    text: "My first job: computer vision for hospitality. OpenCV, YOLO, TensorFlow, and a lot of data cleaning nobody talks about.",
    scene: "camera",
  },
  {
    place: "GenITeam · 2021",
    title: ["Then prices that", "move with demand."],
    text: "Recommenders, dynamic pricing and forecasting. I learned a model only matters when it moves a number.",
    scene: "chart",
  },
  {
    place: "Core Edge · 2023",
    title: ["Healthcare. Where wrong", "answers aren't allowed."],
    text: "A RAG assistant over medical documents: hybrid search, reranking, and evaluation instead of vibes.",
    scene: "pulse",
  },
  {
    place: "Canada Inc. · 2024",
    title: ["Consulting: making", "models survive."],
    text: "Enterprise clients, MLOps pipelines, audits for drift and latency. Shipping stopped being an event and became a process.",
    scene: "pipeline",
  },
  {
    place: "Techprysm · 2025",
    title: ["Now: agents that", "work together."],
    text: "I lead multi-agent systems on LangGraph and MCP, with tracing, evals and guardrails around every run.",
    scene: "network",
  },
  {
    place: "Next",
    title: ["The next chapter", "could be yours."],
    text: "Got a workflow that should run itself? Let's draw it together.",
    scene: "door",
  },
] as const;

/* ---------------- Projects ---------------- */

export type FlowNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "io" | "router" | "agent" | "tool" | "store" | "hub" | "step";
};
export type Flow = {
  nodes: FlowNode[];
  edges: [string, string][];
  routes: { path: string[]; caption: string }[];
  groups?: { label: string; x: number; y: number; w: number; h: number; tone: "accent" | "accent-2" | "accent-3" }[];
};

export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  year: string;
  category: string;
  title: string;
  tagline: string;
  problem: string;
  built: string[];
  role: string;
  tech: string[];
  stats?: Stat[];
  mockup: "finbot" | "health" | "hospitality" | "archive" | "relay" | "workforce";
  flow: Flow;
  /** Which flow nodes each technology powers (used by the graph view) */
  uses: Record<string, string[]>;
  images?: { src: string; alt: string }[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "finbot",
    year: "2025",
    category: "AI Agents · FinTech",
    title: "FinBot",
    tagline: "A multi-agent system that reviews financial documents, checks them against regulations, and writes the report.",
    problem: "Finance teams were reviewing filings, checking rules and building reports by hand. Slow, inconsistent and hard to audit.",
    built: [
      "LangGraph router sends each request to a document, compliance or report agent",
      "MCP servers give agents real tools: database queries, exact maths, chart generation",
      "Tracing, evals and guardrails around every run with LangSmith and Langfuse",
    ],
    role: "Lead AI/ML Engineer · architecture, agents, MCP servers, LLMOps",
    tech: ["LangGraph", "LangChain", "MCP", "LangSmith", "Langfuse", "Docker", "Kubernetes", "AWS"],
    stats: [
      { value: "3", label: "Specialist agents" },
      { value: "3", label: "MCP tool servers" },
      { value: "100%", label: "Runs traced" },
    ],
    mockup: "finbot",
    flow: {
      nodes: [
        { id: "user", label: "User query", x: 240, y: 30, kind: "io" },
        { id: "router", label: "LangGraph router", x: 240, y: 100, kind: "router" },
        { id: "doc", label: "Document analysis", x: 85, y: 180, kind: "agent" },
        { id: "comp", label: "Compliance check", x: 240, y: 180, kind: "agent" },
        { id: "rep", label: "Report writer", x: 395, y: 180, kind: "agent" },
        { id: "mcp", label: "MCP servers", x: 240, y: 255, kind: "hub" },
        { id: "db", label: "DB query", x: 85, y: 322, kind: "tool" },
        { id: "calc", label: "Calc engine", x: 240, y: 322, kind: "tool" },
        { id: "viz", label: "Visualization", x: 395, y: 322, kind: "tool" },
      ],
      edges: [
        ["user", "router"], ["router", "doc"], ["router", "comp"], ["router", "rep"],
        ["doc", "mcp"], ["comp", "mcp"], ["rep", "mcp"], ["mcp", "db"], ["mcp", "calc"], ["mcp", "viz"],
      ],
      routes: [
        { path: ["user", "router", "doc", "mcp", "db"], caption: "document agent pulls the filing's figures via mcp:db.query" },
        { path: ["user", "router", "comp", "mcp", "calc"], caption: "compliance agent checks ratios with mcp:calc, no guessed maths" },
        { path: ["user", "router", "rep", "mcp", "viz"], caption: "report agent charts the results with mcp:viz" },
      ],
      groups: [
        { label: "LANGGRAPH · AGENTS", x: 12, y: 72, w: 456, h: 140, tone: "accent-2" },
        { label: "MCP · TOOLS", x: 12, y: 230, w: 456, h: 118, tone: "accent" },
      ],
    },
    uses: { LangGraph: ["router"], LangChain: ["doc", "comp", "rep"], MCP: ["mcp"], LangSmith: ["router", "comp"], Langfuse: ["router", "rep"], Docker: ["mcp"], Kubernetes: ["mcp"], AWS: ["db"] },
  },
  {
    slug: "workforce",
    year: "2025",
    category: "Multi-tenant SaaS · Analytics",
    title: "Workforce Intelligence",
    tagline: "A multi-tenant platform that turns operational workforce data into daily, weekly and monthly reports with AI-written insights.",
    problem: "Managers were stitching workforce numbers together in spreadsheets, so reports came late and said little.",
    built: [
      "Scheduled ELT with Airflow and dbt into PostgreSQL, isolated per tenant",
      "Celery + Redis jobs build daily, weekly and monthly reports on schedule",
      "An LLM step writes the plain-English insight on top of the numbers",
    ],
    role: "Lead AI/ML Engineer · data platform, report jobs, AI insights",
    tech: ["PostgreSQL", "Airflow", "dbt", "Celery", "Redis", "LLM", "Docker"],
    mockup: "workforce",
    flow: {
      nodes: [
        { id: "src", label: "Ops data", x: 60, y: 50, kind: "store" },
        { id: "airflow", label: "Airflow ELT", x: 180, y: 50, kind: "step" },
        { id: "dbt", label: "dbt models", x: 300, y: 50, kind: "step" },
        { id: "pg", label: "Postgres", x: 420, y: 50, kind: "store" },
        { id: "celery", label: "Celery + Redis", x: 420, y: 170, kind: "hub" },
        { id: "llm", label: "Insight writer", x: 300, y: 170, kind: "agent" },
        { id: "reports", label: "Reports", x: 180, y: 170, kind: "step" },
        { id: "dash", label: "Manager view", x: 60, y: 170, kind: "io" },
        { id: "tenant", label: "Tenant isolation", x: 420, y: 300, kind: "tool" },
        { id: "sched", label: "Schedules", x: 240, y: 300, kind: "tool" },
        { id: "email", label: "Email / PDF", x: 60, y: 300, kind: "io" },
      ],
      edges: [
        ["src", "airflow"], ["airflow", "dbt"], ["dbt", "pg"], ["pg", "celery"], ["celery", "llm"], ["llm", "reports"],
        ["reports", "dash"], ["tenant", "pg"], ["sched", "celery"], ["reports", "email"],
      ],
      routes: [
        { path: ["src", "airflow", "dbt", "pg", "celery", "llm", "reports", "dash"], caption: "nightly: raw data → dbt models → report job → AI insight → dashboard" },
        { path: ["sched", "celery", "llm", "reports", "email"], caption: "Monday 8am: weekly report lands in the manager's inbox" },
      ],
    },
    uses: { PostgreSQL: ["pg", "tenant"], Airflow: ["airflow"], dbt: ["dbt"], Celery: ["celery", "sched"], Redis: ["celery"], LLM: ["llm"], Docker: ["celery"] },
  },
  {
    slug: "healthcare-rag",
    year: "2024",
    category: "RAG · Healthcare",
    title: "Healthcare AI Assistant",
    tagline: "A generative AI assistant that answers medical questions from indexed documents, with sources for every claim.",
    problem: "Staff needed answers buried in large sets of medical documents. A chatbot that guesses confidently is not acceptable in healthcare.",
    built: [
      "Ingestion, chunking and embedding into pgvector and Elasticsearch",
      "Hybrid dense + sparse search, then a reranker picks what the model may cite",
      "Accuracy tuned against a structured evaluation set, not by feel",
    ],
    role: "Senior ML Engineer · retrieval pipeline, evaluation, API",
    tech: ["LangChain", "LlamaIndex", "pgvector", "Elasticsearch", "FastAPI", "Hugging Face"],
    stats: [
      { value: "2", label: "Search modes fused" },
      { value: "1", label: "Rerank before answering" },
      { value: "Eval", label: "Driven tuning" },
    ],
    mockup: "health",
    flow: {
      nodes: [
        { id: "docs", label: "Medical docs", x: 75, y: 40, kind: "store" },
        { id: "ingest", label: "Chunk + embed", x: 75, y: 125, kind: "step" },
        { id: "pg", label: "pgvector", x: 75, y: 215, kind: "store" },
        { id: "es", label: "Elasticsearch", x: 75, y: 305, kind: "store" },
        { id: "user", label: "Question", x: 255, y: 40, kind: "io" },
        { id: "hybrid", label: "Hybrid search", x: 255, y: 125, kind: "router" },
        { id: "fuse", label: "Fuse results", x: 255, y: 260, kind: "step" },
        { id: "rerank", label: "Reranker", x: 405, y: 260, kind: "agent" },
        { id: "llm", label: "LLM + citations", x: 405, y: 150, kind: "agent" },
        { id: "answer", label: "Grounded answer", x: 405, y: 45, kind: "io" },
        { id: "evals", label: "Eval set", x: 255, y: 330, kind: "tool" },
      ],
      edges: [
        ["docs", "ingest"], ["ingest", "pg"], ["ingest", "es"], ["user", "hybrid"], ["hybrid", "pg"], ["hybrid", "es"],
        ["pg", "fuse"], ["es", "fuse"], ["fuse", "rerank"], ["rerank", "llm"], ["llm", "answer"], ["evals", "rerank"],
      ],
      routes: [
        { path: ["user", "hybrid", "pg", "fuse", "rerank", "llm", "answer"], caption: "dense search finds passages by meaning" },
        { path: ["user", "hybrid", "es", "fuse", "rerank", "llm", "answer"], caption: "sparse search catches exact drug names and codes" },
        { path: ["docs", "ingest", "pg"], caption: "new documents are chunked and embedded on arrival" },
      ],
    },
    uses: { LangChain: ["llm", "hybrid"], LlamaIndex: ["ingest"], pgvector: ["pg"], Elasticsearch: ["es"], FastAPI: ["answer"], "Hugging Face": ["rerank", "ingest"] },
  },
  {
    slug: "relay",
    year: "2024",
    category: "Full-stack · Telephony",
    title: "Relay",
    tagline: "A browser-based softphone and outreach CRM I built to replace $20–30/month commercial dialers for international outreach.",
    problem: "Commercial dialers charged per seat every month, and still didn't fit an international outreach workflow.",
    built: [
      "Calls straight from the browser with Twilio Voice, no desk phone or app",
      "Contacts, call outcomes and follow-ups live in a lightweight CRM",
      "Twilio webhooks log every call automatically",
    ],
    role: "Solo build · product, frontend, telephony",
    tech: ["Next.js", "TypeScript", "Twilio", "WebRTC", "Webhooks"],
    stats: [{ value: "$20–30", label: "Monthly dialer cost replaced" }],
    mockup: "relay",
    flow: {
      nodes: [
        { id: "ui", label: "Browser softphone", x: 75, y: 55, kind: "io" },
        { id: "next", label: "Next.js API", x: 240, y: 55, kind: "hub" },
        { id: "token", label: "Access token", x: 240, y: 150, kind: "tool" },
        { id: "twilio", label: "Twilio Voice", x: 400, y: 55, kind: "router" },
        { id: "pstn", label: "Phone network", x: 400, y: 170, kind: "step" },
        { id: "callee", label: "Prospect", x: 400, y: 290, kind: "io" },
        { id: "hooks", label: "Status webhooks", x: 240, y: 290, kind: "step" },
        { id: "logs", label: "Call log", x: 75, y: 290, kind: "store" },
        { id: "crm", label: "CRM pipeline", x: 75, y: 170, kind: "agent" },
      ],
      edges: [
        ["ui", "next"], ["next", "token"], ["token", "twilio"], ["ui", "twilio"], ["twilio", "pstn"], ["pstn", "callee"],
        ["twilio", "hooks"], ["hooks", "logs"], ["logs", "crm"], ["crm", "ui"],
      ],
      routes: [
        { path: ["ui", "next", "token", "twilio", "pstn", "callee"], caption: "click to call: token from the API, WebRTC to Twilio, out to the phone network" },
        { path: ["twilio", "hooks", "logs", "crm", "ui"], caption: "call ends: webhook logs it and updates the CRM" },
      ],
    },
    uses: { "Next.js": ["next", "ui"], TypeScript: ["next", "ui", "crm"], Twilio: ["twilio", "token"], WebRTC: ["ui", "twilio"], Webhooks: ["hooks"] },
  },
  {
    slug: "hp-archive",
    year: "2023",
    category: "Enterprise Data · Compliance",
    title: "Enterprise Archive (HP)",
    tagline: "An enterprise archival and reporting platform to securely move and preserve critical business data.",
    problem: "Critical records had to leave ageing systems without losing a byte, and stay searchable and auditable afterwards.",
    built: [
      "Python/Flask platform with SQLAlchemy models for archived records",
      "Validation and checksums on every migrated record",
      "Retention rules, role-based access and an audit trail for compliance",
    ],
    role: "Python/Flask Engineer · platform, data model, compliance features",
    tech: ["Python", "Flask", "SQLAlchemy", "Data Governance", "Compliance"],
    mockup: "archive",
    flow: {
      nodes: [
        { id: "legacy", label: "Legacy systems", x: 60, y: 55, kind: "store" },
        { id: "extract", label: "Extraction jobs", x: 180, y: 55, kind: "step" },
        { id: "validate", label: "Validate + checksum", x: 300, y: 55, kind: "step" },
        { id: "archive", label: "Secure archive", x: 420, y: 55, kind: "store" },
        { id: "models", label: "SQLAlchemy models", x: 300, y: 170, kind: "step" },
        { id: "policy", label: "Retention policy", x: 420, y: 170, kind: "router" },
        { id: "flask", label: "Flask API", x: 180, y: 250, kind: "hub" },
        { id: "rbac", label: "Role access", x: 60, y: 170, kind: "tool" },
        { id: "search", label: "Search & reports", x: 60, y: 320, kind: "io" },
        { id: "audit", label: "Audit log", x: 420, y: 300, kind: "store" },
      ],
      edges: [
        ["legacy", "extract"], ["extract", "validate"], ["validate", "archive"], ["validate", "models"], ["archive", "policy"],
        ["models", "flask"], ["rbac", "flask"], ["flask", "search"], ["flask", "audit"], ["policy", "audit"],
      ],
      routes: [
        { path: ["legacy", "extract", "validate", "archive", "policy", "audit"], caption: "migration: every record checksummed, archived and logged" },
        { path: ["search", "flask", "models", "validate"], caption: "lookup: search goes through role checks to the archived record" },
      ],
    },
    uses: { Python: ["extract", "validate"], Flask: ["flask"], SQLAlchemy: ["models"], "Data Governance": ["policy", "rbac"], Compliance: ["audit", "policy"] },
  },
  {
    slug: "hospitality",
    year: "2021",
    category: "Classical ML · Hospitality",
    title: "Hospitality Pricing & Vision",
    tagline: "Where it started: recommenders, dynamic pricing, forecasting, and cameras that speed up guest check-in.",
    problem: "Hospitality products priced rooms with static rules, recommended the same things to everyone, and processed guests by hand.",
    built: [
      "Collaborative-filtering recommender and gradient-boosted dynamic pricing",
      "Time-series demand forecasting feeding the price model",
      "YOLO + OpenCV workflow for guest processing at check-in",
    ],
    role: "AI/ML Engineer · modeling, CV pipeline, ETL, serving",
    tech: ["scikit-learn", "XGBoost", "Keras", "TensorFlow", "OpenCV", "YOLO", "Flask"],
    stats: [
      { value: "4", label: "Model types shipped" },
      { value: "2", label: "Databases unified" },
    ],
    mockup: "hospitality",
    flow: {
      nodes: [
        { id: "pms", label: "MySQL bookings", x: 60, y: 50, kind: "store" },
        { id: "mongo", label: "MongoDB guests", x: 60, y: 135, kind: "store" },
        { id: "etl", label: "Python ETL", x: 180, y: 92, kind: "step" },
        { id: "feat", label: "Features", x: 180, y: 190, kind: "step" },
        { id: "rec", label: "Recommender", x: 300, y: 50, kind: "agent" },
        { id: "price", label: "Dynamic pricing", x: 300, y: 135, kind: "agent" },
        { id: "fc", label: "Forecast", x: 300, y: 220, kind: "agent" },
        { id: "api", label: "Flask / FastAPI", x: 420, y: 135, kind: "hub" },
        { id: "cam", label: "Lobby camera", x: 60, y: 305, kind: "io" },
        { id: "yolo", label: "YOLO detect", x: 180, y: 305, kind: "agent" },
        { id: "checkin", label: "Check-in", x: 300, y: 305, kind: "step" },
      ],
      edges: [
        ["pms", "etl"], ["mongo", "etl"], ["etl", "feat"], ["feat", "rec"], ["feat", "price"], ["feat", "fc"], ["fc", "price"],
        ["rec", "api"], ["price", "api"], ["cam", "yolo"], ["yolo", "checkin"], ["checkin", "api"],
      ],
      routes: [
        { path: ["pms", "etl", "feat", "fc", "price", "api"], caption: "demand forecast feeds tomorrow's room price" },
        { path: ["mongo", "etl", "feat", "rec", "api"], caption: "guest history powers personal recommendations" },
        { path: ["cam", "yolo", "checkin", "api"], caption: "camera detects arriving guests to speed up check-in" },
      ],
    },
    uses: { "scikit-learn": ["rec", "feat"], XGBoost: ["price"], Keras: ["fc"], TensorFlow: ["yolo"], OpenCV: ["cam", "yolo"], YOLO: ["yolo"], Flask: ["api"] },
  },
];

export const services: { title: string; text: string; tag: string; big?: boolean; wide?: boolean }[] = [
  {
    title: "AI Agents & Automation",
    text: "Multi-agent systems with LangGraph and MCP that take a workflow off your team's plate, with tool calling, structured outputs and guardrails.",
    tag: "LangGraph · MCP · OpenAI Agents SDK",
    big: true,
  },
  {
    title: "RAG & LLM Applications",
    text: "Assistants that answer from your data. Hybrid search, reranking, and evals that prove it works before users find out it doesn't.",
    tag: "pgvector · Pinecone · Ragas",
    big: true,
  },
  {
    title: "SaaS Development",
    text: "Multi-tenant products that can grow: tenant isolation, role-based access, background jobs, AI features built in.",
    tag: "FastAPI · Next.js · Celery",
  },
  {
    title: "Database & Data Pipelines",
    text: "Data models and pipelines that stay fast and consistent as data grows. PostgreSQL design, ELT, streaming.",
    tag: "Postgres · Airflow · dbt · Kafka",
  },
  {
    title: "MLOps & LLMOps",
    text: "Training, versioning, deployment, tracing and drift monitoring, so models keep working after launch day.",
    tag: "MLflow · LangSmith · Langfuse",
  },
  {
    title: "AI & Technical Consulting",
    text: "A clear technical view for business decisions: architecture reviews, technology choices, and a phased delivery plan.",
    tag: "Architecture · Roadmaps",
    wide: true,
  },
];

export const promises = [
  "Proof of concept on your real data before anything big gets built",
  "An evaluation set from week one, so quality is measured, not guessed",
  "Tracing and guardrails as part of the build, not a later phase",
  "Clear async updates across US, Canada, Europe and Gulf time zones",
];

export const process = [
  {
    q: "What's actually broken?",
    text: "We map the workflow, the data you have, and what a good answer looks like. Not every problem needs an LLM, and I'll say so.",
  },
  {
    q: "Can we prove it on real data?",
    text: "A fast prototype against your documents and an evaluation set, so we know it works before scaling it.",
  },
  {
    q: "Will it hold up in production?",
    text: "Agents, retrieval and pipelines built with guardrails, tracing and CI/CD. Shipped on Docker and Kubernetes.",
  },
  {
    q: "How do we know it's still working?",
    text: "Evals in CI, traces on every run, drift monitoring. When quality slips, we see it before your users do.",
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Generative AI", items: ["LangGraph", "LangChain", "LlamaIndex", "MCP", "OpenAI API", "Claude API", "OpenAI Agents SDK", "AWS Bedrock", "Azure OpenAI", "Hugging Face"] },
  { group: "ML & Deep Learning", items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost", "OpenCV", "YOLO"] },
  { group: "Retrieval", items: ["pgvector", "Pinecone", "FAISS", "Elasticsearch", "Hybrid Search", "Reranking"] },
  { group: "Evals & LLMOps", items: ["LangSmith", "Langfuse", "Ragas", "MLflow", "DVC", "SageMaker"] },
  { group: "Data Engineering", items: ["Airflow", "PySpark", "Kafka", "dbt", "Snowflake"] },
  { group: "Backend & Frontend", items: ["Python", "FastAPI", "Flask", "TypeScript", "React", "Next.js", "Tailwind"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { group: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions"] },
  { group: "Automation", items: ["n8n", "Twilio", "Webhooks", "Celery"] },
];

export const daily = ["Python", "LangGraph", "FastAPI", "PostgreSQL", "Langfuse", "Docker"];
