import { team } from "@/data/team"
import { Mail, Phone } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons"

export default function CMSTeamPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading uppercase tracking-widest font-medium">CMS: Agency Leadership & Team</h1>
          <p className="text-[#A1A1AA] mt-1 text-sm">Manage engineering team profiles, discipline roles, and direct client communication channels.</p>
        </div>
        <span className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-accent-purple rounded text-xs font-mono">
          {team.length} ACTIVE LEAD PARTNERS
        </span>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {team.map((member, idx) => (
          <div
            key={member.id}
            className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 flex flex-col justify-between hover:border-[rgba(255,255,255,0.18)] transition-all duration-300"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center font-mono font-bold text-accent-purple text-xs">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-medium text-white">{member.name}</h2>
                    <p className="text-xs font-mono text-accent-purple">{member.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#52525B]">NODE 0{idx + 1}</span>
              </div>

              <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                {member.description}
              </p>
            </div>

            {/* Contact Coordinates */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-2 gap-3 text-xs font-mono">
              <a
                href={`mailto:${member.email}`}
                className="text-[#A1A1AA] hover:text-white flex items-center transition-colors truncate"
              >
                <Mail size={12} className="mr-2 text-accent-purple shrink-0" />
                <span className="truncate">{member.email}</span>
              </a>

              {member.mobile && (
                <a
                  href={`tel:${member.mobileLink || member.mobile}`}
                  className="text-[#A1A1AA] hover:text-white flex items-center transition-colors"
                >
                  <Phone size={12} className="mr-2 text-emerald-400 shrink-0" />
                  <span>{member.mobile}</span>
                </a>
              )}

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-white flex items-center transition-colors"
                >
                  <LinkedinIcon size={12} className="mr-2 text-blue-400 shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>
              )}

              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-white flex items-center transition-colors"
                >
                  <GithubIcon size={12} className="mr-2 text-white shrink-0" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
