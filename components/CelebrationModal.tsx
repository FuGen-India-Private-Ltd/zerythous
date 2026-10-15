"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Sparkles, Calendar, Copy, Check, ArrowRight, ShieldCheck, X } from "lucide-react"

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  referenceId: string
  clientName: string
  projectName?: string
  type: "contact" | "project_brief"
}

const STATIC_PARTICLES = Array.from({ length: 40 }).map((_, i) => {
  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#ffffff"]
  const pseudoRand = ((i * 9301 + 49297) % 233280) / 233280
  const pseudoRand2 = (((i + 7) * 9301 + 49297) % 233280) / 233280
  return {
    id: i,
    x: (pseudoRand - 0.5) * 600,
    y: -pseudoRand2 * 400 - 50,
    size: pseudoRand * 8 + 4,
    color: colors[i % colors.length],
    delay: pseudoRand2 * 0.4,
    rotate: pseudoRand * 720,
  }
})

export function CelebrationModal({
  isOpen,
  onClose,
  referenceId,
  clientName,
  projectName,
  type,
}: CelebrationModalProps) {
  const [copied, setCopied] = useState(false)

  const copyRefId = () => {
    navigator.clipboard.writeText(referenceId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Confetti Particle Container */}
          <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden z-50">
            {STATIC_PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1.2, 0.8],
                  x: p.x,
                  y: [p.y, p.y + 450],
                  rotate: p.rotate,
                }}
                transition={{ duration: 2.2, delay: p.delay, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: p.size > 8 ? "2px" : "50%",
                }}
              />
            ))}
          </div>

          {/* Celebration Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-xl bg-neutral-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 z-50 overflow-hidden"
          >
            {/* Top Glowing Beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon & Title */}
            <div className="flex flex-col items-center text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400 shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> INITIATIVE RECEIVED & SECURED
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome to Zerythous, {clientName}!
              </h3>
              <p className="text-neutral-400 text-sm mt-1 max-w-md">
                {type === "project_brief"
                  ? `Your architecture brief for "${projectName || "Initiative"}" has been locked and routed to our principal engineering cell.`
                  : "Your confidential architecture inquiry is now priority queued for technical triage."}
              </p>
            </div>

            {/* Reference Tracking Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Transaction & Reference ID
                </div>
                <div className="text-base font-mono font-bold text-emerald-400">
                  {referenceId}
                </div>
              </div>
              <button
                type="button"
                onClick={copyRefId}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Ref"}
              </button>
            </div>

            {/* Process Pipeline Steps */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Delivery Protocol
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-mono">1</span>
                    Automated Confirmation Sent
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Receipt sent via Resend mailer with reference details.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-mono">2</span>
                    Executive Blueprint in &lt;24h
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    System topology & engineering milestone breakdown delivered.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 group"
              >
                <Calendar className="w-4 h-4" />
                Schedule Strategy Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-sm transition-colors border border-neutral-800"
              >
                Return to Site
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
