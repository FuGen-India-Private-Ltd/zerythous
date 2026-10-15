import React from "react"
import {
  Zap,
  Mail,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Server,
} from "lucide-react"

export default function AutomationsPage() {
  const googleScriptConfigured = Boolean(
    process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
  )
  const resendConfigured = Boolean(process.env.RESEND_API_KEY)
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "zerythous345@gmail.com"

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Zap className="w-3.5 h-3.5" /> ENTERPRISE PIPELINE ENGINE
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Smart Automations & Mailing Engine
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage Google Apps Script sheet synchronizer, Resend transactional automations, and client celebration dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://resend.com/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-medium text-neutral-200 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            Resend Console
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>
          <a
            href="https://script.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-semibold text-emerald-400 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Google Apps Script
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Integration Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Google Apps Script Card */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                googleScriptConfigured
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}
            >
              {googleScriptConfigured ? "ACTIVE & SYNCING" : "STANDBY (READY)"}
            </span>
          </div>
          <h3 className="text-base font-semibold text-white">Google Sheets Webhook</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4 leading-relaxed">
            Automatically logs every customer contact inquiry and project brief submission row-by-row in real-time.
          </p>
          <div className="text-[11px] font-mono text-neutral-400 bg-neutral-950 p-2.5 rounded-md border border-neutral-800 break-all">
            ENV: GOOGLE_APPS_SCRIPT_URL
          </div>
        </div>

        {/* Resend Email Card */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                resendConfigured
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}
            >
              {resendConfigured ? "CONNECTED" : "AWAITING API KEY"}
            </span>
          </div>
          <h3 className="text-base font-semibold text-white">Resend Smart Mailer</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4 leading-relaxed">
            Dispatches luxury dark-mode celebration emails to clients and instant executive alerts to your admin inbox.
          </p>
          <div className="text-[11px] font-mono text-neutral-400 bg-neutral-950 p-2.5 rounded-md border border-neutral-800 break-all">
            ENV: RESEND_API_KEY
          </div>
        </div>

        {/* Executive Dispatch Target */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Server className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400">
              INTERNAL DISPATCH
            </span>
          </div>
          <h3 className="text-base font-semibold text-white">Executive Recipient</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4 leading-relaxed">
            All high-priority deal notices and architectural requests route to this verified email destination.
          </p>
          <div className="text-[11px] font-mono text-purple-300 bg-neutral-950 p-2.5 rounded-md border border-neutral-800 break-all">
            {adminEmail}
          </div>
        </div>
      </div>

      {/* Full Process Flow Diagram */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Autonomous Submission Pipeline
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[11px]">1</span>
              TRIGGER
            </div>
            <div className="text-sm font-semibold text-white">Client Submits Form</div>
            <div className="text-xs text-neutral-400 mt-1">
              Contact inquiry or 6-step architecture project brief sent with rate-limit & anti-honeypot checks.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[11px]">2</span>
              STORAGE
            </div>
            <div className="text-sm font-semibold text-white">Dual Database Write</div>
            <div className="text-xs text-neutral-400 mt-1">
              Writes to Supabase with RLS + asynchronous webhook POST to Google Sheets backend.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px]">3</span>
              CELEBRATION
            </div>
            <div className="text-sm font-semibold text-white">Client Celebration Email</div>
            <div className="text-xs text-neutral-400 mt-1">
              Dispatches branded dark-mode confirmation with Reference ID, SLA timeline, and Calendly link.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[11px]">4</span>
              ALERT
            </div>
            <div className="text-sm font-semibold text-white">Executive Alert</div>
            <div className="text-xs text-neutral-400 mt-1">
              Instant notification to Zerythous admin with scope, budget, and direct link to Kanban pipeline.
            </div>
          </div>
        </div>
      </div>

      {/* Google Apps Script Quick Setup Guide */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              Google Apps Script Source Code & Walkthrough
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Copy this script directly into your Google Sheets Apps Script editor to enable instant cloud logging.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-1 bg-neutral-950 border border-neutral-800 text-neutral-400 rounded">
            scripts/google-apps-script.js
          </span>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 font-mono text-xs text-neutral-300 overflow-x-auto max-h-64">
          <pre>{`// HOW TO DEPLOY:
// 1. Open Google Sheets (create a blank spreadsheet, e.g. "Zerythous Submissions").
// 2. Click Extensions > Apps Script.
// 3. Paste this script into Code.gs and click Deploy > New deployment.
// 4. Select type "Web app", "Execute as: Me", "Who has access: Anyone".
// 5. Copy the Web app URL into your .env: GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSubmissionsSheet();
    sheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.type || "unknown",
      payload.name || "",
      payload.email || "",
      payload.phone || "",
      payload.company || "",
      payload.subjectOrProject || "",
      Array.isArray(payload.services) ? payload.services.join(", ") : "",
      payload.budget || "",
      payload.timeline || "",
      payload.messageOrRequirements || "",
      "NEW_LEAD"
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`}</pre>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Ready to copy from <code className="text-white">scripts/google-apps-script.js</code>
          </div>
          <div className="text-neutral-500 font-mono text-[11px]">
            Zero npm dependencies required • Runs completely serverless on Google Cloud
          </div>
        </div>
      </div>
    </div>
  )
}
