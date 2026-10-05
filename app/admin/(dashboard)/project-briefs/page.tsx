import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import Link from "next/link"

export default async function ProjectBriefsPage() {
  const supabase = await createClient()
  const { data: briefs } = await supabase.from("project_briefs").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-heading uppercase tracking-widest font-medium">Project Briefs</h1>
        <p className="text-[#A1A1AA] mt-2 text-sm">Detailed project requirements submitted via the public wizard.</p>
      </div>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden w-full">
        {(!briefs || briefs.length === 0) ? (
          <div className="p-12 text-center text-[#52525B] text-sm">
            NO PROJECT BRIEFS FOUND
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#070707] border-b border-[rgba(255,255,255,0.05)] text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono">
                <tr>
                  <th className="p-4 font-normal">Client</th>
                  <th className="p-4 font-normal">Project Type</th>
                  <th className="p-4 font-normal">Budget</th>
                  <th className="p-4 font-normal">Date</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {briefs.map(brief => (
                  <tr key={brief.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-white">{brief.name}</p>
                      <p className="text-[#A1A1AA] text-xs">{brief.company || 'Individual'}</p>
                    </td>
                    <td className="p-4 text-white/80">{brief.project_type}</td>
                    <td className="p-4 text-white/80">{brief.budget}</td>
                    <td className="p-4 text-[#A1A1AA] text-xs">{new Date(brief.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider border ${
                        brief.status === 'submitted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        brief.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        brief.status === 'closed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border-[rgba(255,255,255,0.1)]'
                      }`}>
                        {brief.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/project-briefs/${brief.id}`} className="text-xs text-accent-purple hover:text-white px-3 py-1.5 rounded bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
                        View Full Brief
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}