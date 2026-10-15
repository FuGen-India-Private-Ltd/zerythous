import { createClient } from "@/lib/supabase/server"
import { DollarSign, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function PipelinePage() {
  const supabase = await createClient()

  const [{ data: inquiries }, { data: briefs }] = await Promise.all([
    supabase.from("project_inquiries").select("*").order("created_at", { ascending: false }),
    supabase.from("project_briefs").select("*").order("created_at", { ascending: false })
  ])

  const totalInquiries = inquiries?.length || 0
  const totalBriefs = briefs?.length || 0

  const stages = [
    {
      id: "discovery",
      title: "1. DISCOVERY & SCOPING",
      color: "border-amber-500/30 text-amber-400 bg-amber-500/5",
      badgeColor: "bg-amber-500/20 text-amber-300",
      items: [
        ...(inquiries?.filter(i => i.status === "new" || i.status === "reviewing") || []).map(i => ({
          id: i.id,
          title: i.name,
          company: i.company || "Direct Client",
          type: i.project_type || "Custom Software",
          budget: i.budget || "TBD",
          timeline: i.timeline || "Immediate",
          source: "Inquiry Form",
          link: `/admin/inquiries/${i.id}`,
          status: i.status
        }))
      ]
    },
    {
      id: "proposals",
      title: "2. PROPOSAL & ARCHITECTURE",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/5",
      badgeColor: "bg-blue-500/20 text-blue-300",
      items: [
        ...(briefs?.filter(b => b.status === "submitted" || b.status === "reviewing") || []).map(b => ({
          id: b.id,
          title: b.name,
          company: b.company || "Enterprise Lead",
          type: b.project_type || "AI Architecture",
          budget: b.budget || "$2k - $5k",
          timeline: b.timeline || "1-3 Months",
          source: "Project Builder",
          link: `/admin/project-briefs/${b.id}`,
          status: b.status
        }))
      ]
    },
    {
      id: "engineering",
      title: "3. ACTIVE ENGINEERING",
      color: "border-accent-purple/30 text-accent-purple bg-accent-purple/5",
      badgeColor: "bg-accent-purple/20 text-purple-300",
      items: [
        ...(inquiries?.filter(i => i.status === "in_progress") || []).map(i => ({
          id: i.id,
          title: i.name,
          company: i.company || "Contracted Project",
          type: i.project_type || "Web & Mobile",
          budget: i.budget || "$5k+",
          timeline: i.timeline || "Active Sprint",
          source: "Inquiry",
          link: `/admin/inquiries/${i.id}`,
          status: i.status
        })),
        {
          id: "rescueai-internal",
          title: "RescueAI v2.0",
          company: "Zerythous Core Project",
          type: "Emergency Response AI",
          budget: "Enterprise",
          timeline: "In Progress",
          source: "Internal Lab",
          link: "#",
          status: "in_progress"
        }
      ]
    },
    {
      id: "delivered",
      title: "4. DELIVERED / LIVE",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
      badgeColor: "bg-emerald-500/20 text-emerald-300",
      items: [
        ...(inquiries?.filter(i => i.status === "completed" || i.status === "closed") || []).map(i => ({
          id: i.id,
          title: i.name,
          company: i.company || "Completed",
          type: i.project_type || "Full System",
          budget: i.budget || "Finalized",
          timeline: "Delivered",
          source: "Archive",
          link: `/admin/inquiries/${i.id}`,
          status: i.status
        })),
        {
          id: "resumeai-delivered",
          title: "ResumeAI Engine",
          company: "Career Tech Client",
          type: "SaaS AI Platform",
          budget: "$5k+",
          timeline: "Live Production",
          source: "Portfolio",
          link: "#",
          status: "completed"
        }
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading uppercase tracking-widest font-medium">Agency Process Pipeline</h1>
          <p className="text-[#A1A1AA] mt-1 text-sm">Real-time Kanban tracking of client engagements from discovery to production delivery.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/project-briefs"
            className="px-4 py-2 bg-white text-black text-xs font-mono uppercase tracking-wider rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Review Briefs ({totalBriefs})
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-white text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-[rgba(255,255,255,0.12)] transition-colors"
          >
            Inquiries ({totalInquiries})
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs font-mono uppercase tracking-widest mb-2">
            <span>Active Client Deals</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <p className="text-3xl font-medium tracking-tight text-white">{totalInquiries + totalBriefs}</p>
          <p className="text-xs text-[#52525B] mt-1">Across all pipeline stages</p>
        </div>

        <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs font-mono uppercase tracking-widest mb-2">
            <span>Average Delivery Cycle</span>
            <Clock size={16} className="text-blue-400" />
          </div>
          <p className="text-3xl font-medium tracking-tight text-white">2 - 6 Weeks</p>
          <p className="text-xs text-[#52525B] mt-1">From architecture blueprint to deployment</p>
        </div>

        <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
          <div className="flex items-center justify-between text-[#A1A1AA] text-xs font-mono uppercase tracking-widest mb-2">
            <span>Client IP Ownership</span>
            <DollarSign size={16} className="text-accent-purple" />
          </div>
          <p className="text-3xl font-medium tracking-tight text-white">100%</p>
          <p className="text-xs text-[#52525B] mt-1">Zero vendor lock-in guarantee</p>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden flex flex-col min-h-[500px]">
            {/* Column Header */}
            <div className={`p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between ${stage.color}`}>
              <span className="font-mono text-xs font-semibold tracking-wider">{stage.title}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${stage.badgeColor}`}>
                {stage.items.length}
              </span>
            </div>

            {/* Column Items */}
            <div className="p-4 space-y-4 flex-1">
              {stage.items.length === 0 ? (
                <div className="py-12 text-center text-[#52525B] text-xs font-mono">
                  STAGE EMPTY
                </div>
              ) : (
                stage.items.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="p-4 rounded-lg bg-[#070707] border border-[rgba(255,255,255,0.06)] hover:border-accent-purple/50 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm text-white group-hover:text-accent-purple transition-colors">
                        {item.title}
                      </p>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[#A1A1AA]">
                        {item.source}
                      </span>
                    </div>

                    <p className="text-xs text-[#A1A1AA] mb-3">{item.company}</p>

                    <div className="space-y-1 text-[11px] font-mono text-[#71717A] mb-4">
                      <div className="flex justify-between">
                        <span>TYPE:</span>
                        <span className="text-white/80">{item.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BUDGET:</span>
                        <span className="text-emerald-400 font-semibold">{item.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TIMELINE:</span>
                        <span className="text-white/80">{item.timeline}</span>
                      </div>
                    </div>

                    {item.link !== "#" ? (
                      <Link
                        href={item.link}
                        className="w-full flex items-center justify-center py-1.5 px-3 rounded bg-[rgba(255,255,255,0.04)] hover:bg-accent-purple hover:text-white text-xs font-mono transition-colors text-[#A1A1AA]"
                      >
                        Inspect Details <ArrowRight size={12} className="ml-1" />
                      </Link>
                    ) : (
                      <div className="text-[10px] font-mono text-center text-emerald-400/70 py-1">
                        ACTIVE IN LAB
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
