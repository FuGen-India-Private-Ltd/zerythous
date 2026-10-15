import { projects } from "@/data/projects"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import { GithubIcon } from "@/components/icons/BrandIcons"

export default function CMSProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading uppercase tracking-widest font-medium">CMS: Case Studies & Projects</h1>
          <p className="text-[#A1A1AA] mt-1 text-sm">Manage client-facing portfolio case studies, technology stacks, and live deployments.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-accent-purple rounded text-xs font-mono">
            {projects.length} PUBLISHED PROJECTS
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 flex flex-col justify-between hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 group"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[10px] font-mono tracking-wider uppercase text-accent-purple">
                  {project.category}
                </span>
                <span className="flex items-center text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 size={10} className="mr-1" /> LIVE
                </span>
              </div>

              <h3 className="text-xl font-heading font-medium text-white mb-2 group-hover:text-accent-purple transition-colors">
                {project.title}
              </h3>

              <p className="text-xs text-[#A1A1AA] line-clamp-3 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(project.technology || []).slice(0, 6).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-[10px] font-mono text-[#71717A]"
                  >
                    {tech}
                  </span>
                ))}
                {(project.technology || []).length > 6 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#52525B]">
                    +{(project.technology || []).length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Links & Actions Footer */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white hover:text-accent-purple flex items-center transition-colors"
                  >
                    <ExternalLink size={12} className="mr-1" /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#A1A1AA] hover:text-white flex items-center transition-colors"
                  >
                    <GithubIcon size={12} className="mr-1" /> Repo
                  </a>
                )}
              </div>

              <span className="text-[10px] font-mono text-[#52525B]">
                ID: {project.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
