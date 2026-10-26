// All portfolio content lives here. Edit this file to update the site.
// To add a project: copy an entry in `projects`, change the text, and
// (optionally) drop screenshots in /public/projects and list them in `images`.

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
  color: string;
  initials: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Techprysm",
    title: "Lead AI/ML Engineer",
    period: "Jul 2025 – Present",
    place: "United States · Remote",
    type: "Contract",
    color: "#c8f031",
    initials: "T",
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
    color: "#8b7bff",
    initials: "CI",
    points: [
      "Delivered specialized AI models for enterprise clients, from problem framing and training to deployment.",
      "Streamlined MLOps pipelines for training, versioning and deployment with MLflow, Docker, Kubernetes and CI/CD.",
      "Ran model performance audits on accuracy, drift and latency, and turned findings into retraining plans.",
    ],
  },
  {
    company: "Core Edge Solutions",
    title: "Senior Machine Learning Engineer",
    period: "Feb 2023 – Nov 2024",
    place: "Lahore · Hybrid",
    type: "Full-time",
    color: "#22d3ee",
    initials: "CE",
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
    color: "#f5a524",
    initials: "G",
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
    color: "#f472b6",
    initials: "F",
    points: [
      "Head of the SOFTEC AI event.",
      "Winner, SOFTEC Programming Competition.",
    ],
  },
];

export const journey = [
  {
    year: "2020",
    title: "Pixels",
    text: "Computer vision for guest processing. OpenCV, YOLO, TensorFlow. Learned that data prep is most of the job.",
    tags: ["OpenCV", "YOLO", "Keras"],
  },
  {
    year: "2021",
    title: "Predictions",
    text: "Recommenders, dynamic pricing and time-series forecasting for hospitality. Models that move revenue.",
    tags: ["XGBoost", "Forecasting", "RecSys"],
  },
  {
    year: "2023",
    title: "Retrieval",
    text: "Generative AI in healthcare, where wrong answers aren't an option. Hybrid search, reranking, evaluation.",
    tags: ["RAG", "pgvector", "LlamaIndex"],
  },
  {
    year: "2025",
    title: "Agents",
    text: "Multi-agent systems that coordinate, call tools over MCP, and get traced, evaluated and guarded on every run.",
    tags: ["LangGraph", "MCP", "Langfuse"],
  },
];

export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  category: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  tech: string[];
  stats: Stat[];
  visual: "finbot" | "rag" | "hospitality" | "none";
  images?: { src: string; alt: string }[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "finbot",
    category: "AI Agents · FinTech",
    title: "FinBot: Multi-Agent Financial Compliance",
    tagline: "Three agents, one router, and tools they can actually trust.",
    problem:
      "Finance teams were reviewing documents, checking them against regulations and assembling reports by hand. Slow, inconsistent, and hard to audit after the fact.",
    solution:
      "A LangGraph router sends each request to the right specialist: document analysis, compliance checking or report generation. The agents reach the outside world through MCP servers I designed (a database query tool, a calculation engine and a visualization generator), so they pull real numbers, do exact math instead of guessing, and chart the results for the final report. Every run is traced, evaluated and wrapped in guardrails.",
    role: "Lead AI/ML Engineer · architecture, agents, MCP servers, LLMOps",
    tech: ["LangGraph", "LangChain", "MCP", "LangSmith", "Langfuse", "Docker", "Kubernetes", "AWS"],
    stats: [
      { value: "3", label: "Specialist agents" },
      { value: "3", label: "MCP tool servers" },
      { value: "100%", label: "Runs traced & evaluated" },
    ],
    visual: "finbot",
  },
  {
    slug: "healthcare-rag",
    category: "RAG · Healthcare",
    title: "Healthcare Generative AI Assistant",
    tagline: "Answers grounded in the documents, or no answer at all.",
    problem:
      "Staff needed answers buried in large sets of medical documents. A general chatbot that guesses confidently is not acceptable in healthcare.",
    solution:
      "A RAG assistant over indexed medical documents. Ingestion, chunking and embedding pipelines feed pgvector and Elasticsearch. Each query runs dense and sparse search together, then a reranker picks the passages the model is allowed to answer from. Retrieval quality and answer accuracy were tuned against a structured evaluation set, not by feel.",
    role: "Senior ML Engineer · retrieval pipeline, evaluation, API",
    tech: ["LangChain", "LlamaIndex", "pgvector", "Elasticsearch", "FastAPI", "Hugging Face"],
    stats: [
      { value: "2", label: "Search modes fused (dense + sparse)" },
      { value: "1", label: "Reranking pass before every answer" },
      { value: "Eval", label: "Driven tuning loop" },
    ],
    visual: "rag",
  },
  {
    slug: "hospitality",
    category: "Classical ML · Hospitality",
    title: "Hospitality Pricing & Guest Vision",
    tagline: "Where it started: models that move revenue and cameras that save time.",
    problem:
      "Hospitality products priced rooms with static rules, recommended the same things to everyone, and processed guests by hand.",
    solution:
      "Recommendation systems with collaborative filtering, dynamic pricing with gradient boosting and time-series forecasting, and computer vision workflows for guest processing with OpenCV, YOLO and TensorFlow. All of it fed by Python and SQL ETL from MySQL and MongoDB, tuned with cross-validation and served through Flask and FastAPI.",
    role: "AI/ML Engineer · modeling, CV pipeline, ETL, serving",
    tech: ["scikit-learn", "XGBoost", "Keras", "TensorFlow", "OpenCV", "YOLO", "Flask"],
    stats: [
      { value: "4", label: "Model types shipped" },
      { value: "2", label: "Source databases unified" },
      { value: "CV", label: "Guest processing automated" },
    ],
    visual: "hospitality",
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
