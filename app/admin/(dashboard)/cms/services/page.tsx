import { services } from "@/data/services"
import { CheckCircle2 } from "lucide-react"

export default function CMSServicesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading uppercase tracking-widest font-medium">CMS: Services & Capabilities</h1>
          <p className="text-[#A1A1AA] mt-1 text-sm">Manage core agency offerings, technical specializations, and deliverables presented to prospective clients.</p>
        </div>
        <span className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-accent-purple rounded text-xs font-mono">
          {services.length} CORE CAPABILITY PILLARS
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={service.id}
            className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 flex flex-col justify-between hover:border-[rgba(255,255,255,0.18)] transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#52525B]">0{idx + 1} {"//"} ARCHITECTURE</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  ACTIVE
                </span>
              </div>

              <h2 className="text-xl font-heading font-medium text-white mb-3">
                {service.title}
              </h2>

              <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Capabilities List */}
              <div className="mb-6">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] mb-3">Deliverables</p>
                <div className="space-y-2">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center text-xs text-white/90">
                      <CheckCircle2 size={12} className="text-accent-purple mr-2 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] mb-2">Engineered With</p>
              <div className="flex flex-wrap gap-1.5">
                {service.technology.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[10px] font-mono text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
