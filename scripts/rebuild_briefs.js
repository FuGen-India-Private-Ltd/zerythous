const fs = require('fs');
const path = require('path');

const file = `import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, Building, Calendar } from "lucide-react"

export default async function ProjectBriefDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: brief } = await supabase.from("project_briefs").select("*").eq("id", params.id).single()

  if (!brief) {
    redirect("/admin/project-briefs")
  }

  const updateStatus = async (formData: FormData) => {
    "use server"
    const status = formData.get("status") as string
    const supabase = await createClient()
    await supabase.from("project_briefs").update({ status }).eq("id", params.id)
    revalidatePath(\`/admin/project-briefs/\${params.id}\`)
    revalidatePath("/admin/project-briefs")
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <Link href="/admin/project-briefs" className="inline-flex items-center text-xs text-[#A1A1AA] hover:text-white uppercase tracking-widest font-mono">
        <ArrowLeft size={14} className="mr-2" /> Back to Briefs
      </Link>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Main Content */}
        <div className="flex-1 border-r border-[rgba(255,255,255,0.05)]">
          <div className="p-8 border-b border-[rgba(255,255,255,0.05)]">
            <h1 className="text-3xl font-medium text-white mb-2">{brief.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-[#A1A1AA] mt-4">
              <a href={\`mailto:\${brief.email}\`} className="flex items-center hover:text-accent-purple transition-colors">
                <Mail size={14} className="mr-2" /> {brief.email}
              </a>
              {brief.phone && (
                <a href={\`tel:\${brief.phone}\`} className="flex items-center hover:text-accent-purple transition-colors">
                  <Phone size={14} className="mr-2" /> {brief.phone}
                </a>
              )}
              {brief.company && (
                <span className="flex items-center">
                  <Building size={14} className="mr-2" /> {brief.company}
                </span>
              )}
            </div>
          </div>

          <div className="p-8 grid grid-cols-2 gap-8 border-b border-[rgba(255,255,255,0.05)]">
            <div>
              <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Project Type</h3>
              <p className="text-white text-sm">{brief.project_type}</p>
            </div>
            <div>
              <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Services</h3>
              <p className="text-white text-sm">{(brief.services || []).join(', ') || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Timeline</h3>
              <p className="text-white text-sm">{brief.timeline}</p>
            </div>
            <div>
              <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Budget</h3>
              <p className="text-white text-sm">{brief.budget}</p>
            </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-4">Project Description / Requirements</h3>
            <p className="text-white/90 text-sm whitespace-pre-wrap leading-relaxed">{brief.requirements || brief.description || 'No additional details provided.'}</p>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="w-full md:w-80 bg-[#070707] p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-4">Administration</h3>
            
            <div className="mb-6">
              <span className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-2 block">Current Status</span>
              <span className={\`px-3 py-1.5 rounded text-xs uppercase font-mono tracking-wider border inline-block \${
                  brief.status === 'submitted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                  brief.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                  brief.status === 'closed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border-[rgba(255,255,255,0.1)]'
                }\`}>
                  {brief.status}
              </span>
            </div>

            <form action={updateStatus} className="space-y-3">
              <label className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase block">Update Status</label>
              <select name="status" defaultValue={brief.status} className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple">
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="reviewing">Reviewing</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <button type="submit" className="w-full py-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white rounded-lg text-sm transition-colors border border-[rgba(255,255,255,0.05)] mt-2">
                Save Changes
              </button>
            </form>
          </div>

          <div className="mt-12 text-[#52525B] text-xs font-mono uppercase tracking-widest border-t border-[rgba(255,255,255,0.05)] pt-6">
            <p>Submitted:</p>
            <p className="mt-1 text-white">{new Date(brief.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}`;

const fullPath = path.join(__dirname, '..', 'app/admin/(dashboard)/project-briefs/[id]/page.tsx');
const dir = path.dirname(fullPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(fullPath, file);
console.log('Project Briefs [id] page created.');
