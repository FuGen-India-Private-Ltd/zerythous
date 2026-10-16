"use client";

import React, { useState } from "react";
import {
  Cpu,
  Layers,
  Database,
  Radio,
  ShieldCheck,
  Activity,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface ArchitectureNode {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  latency: string;
  throughput: string;
  stack: string;
  description: string;
  security: string;
  coords: { x: number; y: number };
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "edge",
    name: "Edge Gateway & WAF",
    category: "INGESTION LAYER",
    icon: ShieldCheck,
    latency: "14ms",
    throughput: "120,000 req/s",
    stack: "Next.js 16 Edge / Cloudflare / WAF",
    description: "Global edge network terminates SSL, filters malicious DDoS payloads, and handles tokenized rate-limiting.",
    security: "Rate-limiting • Honeypot filtration • Strict CSP",
    coords: { x: 15, y: 30 },
  },
  {
    id: "agents",
    name: "Autonomous Agent Swarm",
    category: "INTELLIGENCE ENGINE",
    icon: Cpu,
    latency: "340ms",
    throughput: "850 concurrent tasks",
    stack: "LangChain / OpenAI / Gemini 2.0 / ReAct",
    description: "Autonomous agent network executing dynamic reasoning loops, tool-calling, and deterministic verification.",
    security: "Deterministic guardrails • Zero prompt injection",
    coords: { x: 50, y: 18 },
  },
  {
    id: "rag",
    name: "Hybrid Vector Search (RAG)",
    category: "KNOWLEDGE RETRIEVAL",
    icon: Layers,
    latency: "28ms",
    throughput: "14,000 queries/s",
    stack: "Pinecone / BM25 Sparse / Vector Embeddings",
    description: "Dense semantic embeddings paired with lexical BM25 matching guarantee 100% citation grounding with zero hallucinations.",
    security: "PII redaction before vector indexing",
    coords: { x: 85, y: 30 },
  },
  {
    id: "db",
    name: "Deterministic State & RLS",
    category: "PERSISTENCE TIER",
    icon: Database,
    latency: "4.2ms",
    throughput: "45,000 tx/s",
    stack: "Supabase PostgreSQL / Redis / PostGIS",
    description: "Postgres database fortified with Row Level Security (RLS) guaranteeing cryptographic data isolation per organization.",
    security: "Tenant isolation • Encrypted at rest (AES-256)",
    coords: { x: 30, y: 75 },
  },
  {
    id: "stream",
    name: "Realtime Event Stream",
    category: "MESSAGE BUS & SYNC",
    icon: Radio,
    latency: "8ms",
    throughput: "95,000 msgs/s",
    stack: "WebSockets / Redis PubSub / Resend / Webhooks",
    description: "Low-latency bidirectional socket layer dispatching live telemetry, client alerts, and Google Sheets sync.",
    security: "HMAC webhook signatures • TLS 1.3 socket tunnels",
    coords: { x: 70, y: 75 },
  },
];

export default function ArchitecturePlayground() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[1]);
  const [trafficMode, setTrafficMode] = useState<"standard" | "surge" | "enterprise">("surge");

  return (
    <section id="architecture" className="py-28 md:py-44 bg-background text-foreground relative overflow-hidden border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300">
      {/* Aurora Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full aurora-glow-purple blur-3xl pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full aurora-glow-blue blur-3xl pointer-events-none opacity-40" />
      <div className="absolute inset-0 grid-pattern-dual pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-mono text-xs mb-4 font-semibold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              LIVE ARCHITECTURE TOPOLOGY
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#09090B] dark:text-white leading-none font-heading">
              Engineering Built for <br />
              <span className="text-accent-purple">
                Deterministic Scale.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-mono text-[#71717A] dark:text-neutral-400 uppercase tracking-wider">
              Simulate Traffic Load:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10">
              {(["standard", "surge", "enterprise"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTrafficMode(mode)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium tracking-wider capitalize transition-all ${
                    trafficMode === mode
                      ? "bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] font-bold shadow-sm"
                      : "text-[#52525B] dark:text-neutral-400 hover:text-[#09090B] dark:hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Interactive Canvas & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Topology Canvas (Left 7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl glass-card p-6 md:p-8 relative min-h-[460px] md:min-h-[520px] flex flex-col justify-between overflow-hidden">
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-[#71717A] dark:text-neutral-400 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-ping" />
                <span className="text-[#09090B] dark:text-white font-semibold">DISTRIBUTED CLOUD TOPOLOGY</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px]">
                <span>ENCRYPTION: TLS 1.3</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
            </div>

            {/* SVG Connecting Bus Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <line x1="15%" y1="30%" x2="50%" y2="18%" stroke="currentColor" className="text-accent-purple/30" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="50%" y1="18%" x2="85%" y2="30%" stroke="currentColor" className="text-accent-purple/30" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="15%" y1="30%" x2="30%" y2="75%" stroke="currentColor" className="text-accent-blue/30" strokeWidth="1.5" />
              <line x1="50%" y1="18%" x2="30%" y2="75%" stroke="currentColor" className="text-accent-purple/30" strokeWidth="2" />
              <line x1="50%" y1="18%" x2="70%" y2="75%" stroke="currentColor" className="text-accent-blue/30" strokeWidth="2" />
              <line x1="30%" y1="75%" x2="70%" y2="75%" stroke="currentColor" className="text-neutral-400/30 dark:text-white/20" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>

            {/* Interactive Nodes Placement */}
            <div className="relative flex-1 min-h-[360px] my-4">
              {ARCHITECTURE_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const IconComponent = node.icon;

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      position: "absolute",
                      top: `${node.coords.y}%`,
                      left: `${node.coords.x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={`group/node z-20 flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 focus:outline-none ${
                      isSelected
                        ? "bg-white dark:bg-neutral-900 border-2 border-accent-purple shadow-xl shadow-accent-purple/20 scale-105"
                        : "bg-white/80 dark:bg-neutral-950/80 border border-black/10 dark:border-white/10 hover:border-accent-purple/40 hover:bg-white dark:hover:bg-neutral-900"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                        isSelected
                          ? "bg-accent-purple/15 text-accent-purple font-bold"
                          : "bg-black/[0.04] dark:bg-white/[0.04] text-[#71717A] dark:text-neutral-400 group-hover/node:text-accent-purple"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#09090B] dark:text-white tracking-tight whitespace-nowrap">
                      {node.name}
                    </span>
                    <span className="text-[9px] font-mono text-accent-purple mt-0.5 font-semibold">
                      {node.latency}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-xs font-mono text-[#71717A] dark:text-neutral-400">
              <div className="flex items-center gap-2 text-accent-purple font-medium">
                <Sparkles className="w-4 h-4" />
                <span>ACTIVE SIMULATION: {trafficMode.toUpperCase()} THROUGHPUT</span>
              </div>
              <div className="text-[#71717A] dark:text-neutral-500">
                Click any node to inspect telemetry & stack details
              </div>
            </div>
          </div>

          {/* Node Inspector & Telemetry Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl glass-card p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-accent-purple/10 border border-accent-purple/30 text-accent-purple font-mono text-xs font-bold">
                  {selectedNode.category}
                </span>
                <span className="text-xs font-mono text-[#71717A] dark:text-neutral-400 font-semibold">NODE ID: {selectedNode.id.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl font-bold text-[#09090B] dark:text-white mb-2 font-heading">
                {selectedNode.name}
              </h3>
              <p className="text-sm text-[#52525B] dark:text-neutral-300 leading-relaxed mb-6 font-light">
                {selectedNode.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-black/[0.06] dark:border-white/[0.08]">
                  <div className="text-[10px] font-mono text-[#71717A] dark:text-neutral-400 uppercase tracking-wider mb-1">
                    EXECUTION LATENCY
                  </div>
                  <div className="text-2xl font-bold text-accent-purple font-mono">
                    {selectedNode.latency}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-black/[0.06] dark:border-white/[0.08]">
                  <div className="text-[10px] font-mono text-[#71717A] dark:text-neutral-400 uppercase tracking-wider mb-1">
                    PEAK THROUGHPUT
                  </div>
                  <div className="text-2xl font-bold text-accent-blue font-mono">
                    {selectedNode.throughput}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono text-[#71717A] dark:text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-accent-purple" />
                  ENGINEERING STACK
                </div>
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-black border border-black/10 dark:border-white/10 font-mono text-xs text-[#09090B] dark:text-neutral-200">
                  {selectedNode.stack}
                </div>
              </div>

              {/* Security Hardening */}
              <div className="p-3.5 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-accent-purple/20 text-xs text-[#52525B] dark:text-neutral-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#09090B] dark:text-white block mb-0.5">Security Standards</strong>
                  <span className="text-[#71717A] dark:text-neutral-400">{selectedNode.security}</span>
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <div className="mt-8 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
              <a
                href="#project-builder"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#09090B] text-white hover:bg-accent-purple dark:bg-white dark:text-[#09090B] dark:hover:bg-accent-purple dark:hover:text-white font-medium text-sm transition-all shadow-md group"
              >
                <span>Deploy This Topology</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
