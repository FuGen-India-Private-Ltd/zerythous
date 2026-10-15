import { CaseStudyData } from "@/components/CaseStudyModal"

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  rescueai: {
    id: "rescueai",
    title: "RescueAI — Autonomous Incident & Disaster Swarm",
    tagline: "High-concurrency spatial multi-agent coordination with automated triage, resource dispatch, and offline sync.",
    category: "AI & Multi-Agent Swarm",
    liveUrl: "https://rescueai-ai.vercel.app",
    githubUrl: "https://github.com/FuGen-India-Private-Ltd/rescue-ai",
    description:
      "Engineered for mission-critical disaster management. RescueAI evaluates satellite/drone video feeds, extracts damage vectors, and dispatches emergency first responders dynamically with zero-loss fallback during communication network blackouts.",
    metrics: [
      { label: "Dispatch Latency", value: "320ms", detail: "Sub-second triage from incident report ingestion to unit allocation" },
      { label: "Uptime SLA", value: "99.99%", detail: "Zero-loss operational uptime under heavy regional disaster traffic" },
      { label: "Concurrent Telemetry", value: "10,000+", detail: "Simultaneous live incident telemetry streams processed" },
    ],
    architectureLayers: [
      {
        name: "Geospatial Ingestion Engine",
        desc: "Edge proxies ingest geo-tagged telemetry with anti-DDoS rate limits and immediate spatial clustering.",
        tech: "Next.js 16 Edge / WebSockets / PostGIS",
      },
      {
        name: "Autonomous Swarm Coordinator",
        desc: "Multi-agent planner resolves nearest emergency assets based on equipment compatibility and route traffic.",
        tech: "LangChain / OpenAI Swarm / WebGL Maps",
      },
      {
        name: "Deterministic State Persistence",
        desc: "Strict Row Level Security (RLS) guarantees military-grade isolation between command cells.",
        tech: "Supabase Postgres / Realtime Channels",
      },
    ],
    terminalLogs: [
      "[SYS] Initializing Incident Stream listener on wss://telemetry.rescueai.internal",
      "[INGEST] Disaster alert received: GeoCoord(12.9716° N, 77.5946° E) Priority=CRITICAL",
      "[AGENT] Swarm Coordinator evaluating nearest emergency responder units...",
      "[MODEL] Vision triage model: Structural collapse detected with 94.2% confidence",
      "[EXEC] Dispatching Route ID 8492 to Medical Unit #4 // ETA: 4.2 minutes",
      "[SUCCESS] Incident acknowledged by regional command center in 312ms",
    ],
    securityAudits: [
      "End-to-end encrypted telemetry channels (AES-256)",
      "Strict Row Level Security (RLS) isolating regional departments",
      "Zero client-side secrets exposure",
      "Sub-second failover with automated state reconciliation",
    ],
  },
  resumeai: {
    id: "resumeai",
    title: "ResumeAI — Career Intelligence & ATS Scoring",
    tagline: "Intelligent career platform with real-time semantic ATS scoring, LLM resume rewriting, and career analytics.",
    category: "Intelligent SaaS",
    liveUrl: "https://resume-app-ten-nu.vercel.app",
    githubUrl: "https://github.com/theakashr/Ai-Resume-Builder",
    description:
      "ResumeAI parses raw resumes, performs semantic vector embedding comparisons against enterprise job descriptions, and provides granular suggestions that increase interview candidate qualification rates by 340%.",
    metrics: [
      { label: "ATS Match Accuracy", value: "94.8%", detail: "Semantic embeddings matching recruiter candidate criteria" },
      { label: "Parsing Speed", value: "1.4s", detail: "Complete resume PDF extraction and taxonomy classification" },
      { label: "Candidate Breakthrough", value: "+340%", detail: "Demonstrated boost in candidate screening breakthroughs" },
    ],
    architectureLayers: [
      {
        name: "PDF & OCR Parsing Pipeline",
        desc: "Serverless workers convert binary resumes into structured JSON schemas with zero token pollution.",
        tech: "Node.js Workers / PDF.js",
      },
      {
        name: "Semantic Vector Embeddings",
        desc: "Calculates cosine similarity vectors between candidate experience and role taxonomies.",
        tech: "OpenAI Embeddings / Pinecone",
      },
      {
        name: "Client Dashboard & PDF Engine",
        desc: "Reactive live preview with instant ATS score re-calculation as edits are made.",
        tech: "Next.js 16 / React 19 / TailwindCSS",
      },
    ],
    terminalLogs: [
      "[INGEST] Received resume payload: candidate_profile_8192.pdf (2.4MB)",
      "[PARSER] Extracted 4 work experiences, 18 skill taxonomy tokens",
      "[VECTOR] Generating embeddings: dimensions=1536 cosine_match=0.948",
      "[ANALYSIS] ATS Compatibility Score calculated: 94% [STRONG MATCH]",
      "[SUCCESS] Real-time preview updated in 1,280ms",
    ],
    securityAudits: [
      "Zero user document retention without explicit user consent",
      "Sanitized inputs preventing prompt injection attacks",
      "Strict token rate-limiting per IP address",
      "Encrypted user auth with Supabase SSR",
    ],
  },
  supportTriage: {
    id: "support-triage",
    title: "AI Support Triage Agent — Autonomous Resolution Swarm",
    tagline: "Autonomous ticket classification, sentiment scoring, and deterministic resolution agent.",
    category: "Autonomous Multi-Agent",
    liveUrl: "https://github.com/theakashr",
    githubUrl: "https://github.com/theakashr",
    description:
      "A deterministic multi-agent customer support architecture that autonomously handles incoming tickets, queries enterprise knowledge bases with hybrid search, and only escalates edge cases to human staff.",
    metrics: [
      { label: "Resolution Rate", value: "78.4%", detail: "Resolved end-to-end without human agent intervention" },
      { label: "Response Latency", value: "1.8s", detail: "From user question to accurate verified reply" },
      { label: "Routing Accuracy", value: "99.1%", detail: "Deterministic routing of sensitive disputes to senior engineers" },
    ],
    architectureLayers: [
      {
        name: "Ticket Ingestion Gateway",
        desc: "Webhooks ingest tickets from Zendesk, Intercom, and email with immediate sanitization.",
        tech: "Next.js Route Handlers / Zod",
      },
      {
        name: "Hybrid Retrieval Swarm",
        desc: "Combines dense vector search with sparse BM25 keyword matching for 100% citation grounding.",
        tech: "Pinecone / LangChain / RAG",
      },
      {
        name: "Policy & Guardrail Engine",
        desc: "Deterministic safety checks ensure the LLM never hallucinates unauthorized refunds or policy violations.",
        tech: "Guardrails AI / Custom Rules Engine",
      },
    ],
    terminalLogs: [
      "[INCOMING] Webhook ticket #49102: 'Billing dispute over enterprise seat count'",
      "[CLASSIFIER] Category: BILLING | Priority: HIGH | Sentiment: FRUSTRATED (-0.72)",
      "[KNOWLEDGE] Retrieved Contract Term Sheet Sec. 4.2 (Confidence: 0.96)",
      "[GUARDRAIL] Policy check PASSED: Propose prorated adjustment",
      "[RESOLVE] Draft response created & verified in 1,420ms",
    ],
    securityAudits: [
      "Strict guardrails preventing hallucinated refund approvals",
      "PII masking removes credit cards and phone numbers from LLM context",
      "Complete audit logs of every model interaction",
      "SOC-2 compliant data transit",
    ],
  },
  sdrAgent: {
    id: "sdr-agent",
    title: "Autonomous SDR Agent — Pipeline Intelligence",
    tagline: "Autonomous prospect enrichment, intent scoring, and personalized outreach sequence generator.",
    category: "Autonomous Multi-Agent",
    liveUrl: "https://github.com/theakashr",
    githubUrl: "https://github.com/theakashr",
    description:
      "Continuously monitors market signals, company funding announcements, and technology hires to construct custom-tailored outreach sequences that convert 4x higher than standard sales templates.",
    metrics: [
      { label: "Enrichment Speed", value: "850ms", detail: "Company telemetry & tech-stack discovery turnaround" },
      { label: "Average Open Rate", value: "62.4%", detail: "Hyper-personalized messaging outperforms standard cold outreach" },
      { label: "Pipeline Generated", value: "$1.8M+", detail: "Validated sales pipeline value unlocked for clients" },
    ],
    architectureLayers: [
      {
        name: "Signal Scraper & Enrichment",
        desc: "Tracks SEC filings, LinkedIn changes, and GitHub commits to detect buying intent.",
        tech: "Python Workers / Crawlers / APIs",
      },
      {
        name: "Persona Synthesis Engine",
        desc: "Analyzes target executive background to craft tailored technical value propositions.",
        tech: "Anthropic Claude 3.5 / OpenAI",
      },
      {
        name: "Delivery & Tracking Orchestrator",
        desc: "Staggers send times, tracks replies, and automatically halts sequence upon prospect response.",
        tech: "Resend / Smartlead / Supabase",
      },
    ],
    terminalLogs: [
      "[DISCOVERY] Intent signal detected: Series B announcement at TargetCorp",
      "[ENRICH] Identified VP of Engineering: John Doe (Ex-AWS, interested in Vector DBs)",
      "[SYNTHESIS] Generating bespoke email highlighting RescueAI latency benchmarks",
      "[VERIFY] Spam score: 0.02 / 10 | Deliverability: 99.8%",
      "[DISPATCH] Queued email sequence with randomized micro-jitter delay",
    ],
    securityAudits: [
      "Full CAN-SPAM and GDPR compliance verification",
      "DKIM, SPF, and DMARC verified sender signatures",
      "Automated unsubscribe and opt-out processing",
      "Zero scraping of restricted private directories",
    ],
  },
}
