import { createClient } from "@/lib/supabase/server"

export default async function ProjectBriefsPage() {
  const supabase = await createClient()

  const { data: briefs } = await supabase
    .from("project_briefs")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-medium tracking-widest uppercase">Project Briefs</h1>
          <p className="text-[#A1A1AA] mt-2">Manage project submissions from the website builder.</p>
        </div>
      </header>

      <div className="bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
            <tr>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Client</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Type</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Budget</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Timeline</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Status</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
            {briefs?.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-[#52525B]">No project briefs found.</td></tr>
            ) : briefs?.map((item) => (
              <tr key={item.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="px-6 py-4">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-xs text-[#71717A] mt-1">{item.email}</p>
                </td>
                <td className="px-6 py-4 text-[#A1A1AA]">{item.project_type}</td>
                <td className="px-6 py-4 text-[#A1A1AA]">{item.budget}</td>
                <td className="px-6 py-4 text-[#A1A1AA]">{item.timeline}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] rounded text-[10px] uppercase font-mono tracking-wider">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a href={`/admin/project-briefs/${item.id}`} className="text-sm font-medium text-accent-purple hover:text-white transition-colors">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
