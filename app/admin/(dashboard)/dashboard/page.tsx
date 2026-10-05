import { createClient } from "@/lib/supabase/server"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: newInquiries, count: inquiriesCount } = await supabase
    .from("project_inquiries")
    .select("id, name, project_type, budget, timeline, status, created_at", { count: "exact" })
    .eq("status", "new")
    .order("created_at", { ascending: false })
    .limit(5)

  const { count: contactsCount } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact" })
    .eq("status", "new")

  const { data: newBriefs, count: briefsCount } = await supabase
    .from("project_briefs")
    .select("id, projectName:requirements, company, project_type, budget, status, created_at", { count: "exact" })
    .eq("status", "submitted")
    .order("created_at", { ascending: false })
    .limit(5)

  const { count: activeProjects } = await supabase
    .from("project_inquiries")
    .select("id", { count: "exact" })
    .in("status", ["in_progress"])

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-medium tracking-widest uppercase">Zerythous Admin</h1>
        <p className="text-[#A1A1AA] mt-2">Good day, here is the current system status.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
          <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-2">New Inquiries</p>
          <p className="text-4xl font-medium text-white">{inquiriesCount || 0}</p>
        </div>
        <div className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
          <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-2">Project Briefs</p>
          <p className="text-4xl font-medium text-white">{briefsCount || 0}</p>
        </div>
        <div className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
          <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-2">New Contacts</p>
          <p className="text-4xl font-medium text-white">{contactsCount || 0}</p>
        </div>
        <div className="bg-accent-purple/10 p-6 rounded-xl border border-accent-purple/20">
          <p className="text-xs font-mono text-accent-purple uppercase tracking-widest mb-2">Active Projects</p>
          <p className="text-4xl font-medium text-white">{activeProjects || 0}</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">Recent Inquiries</h2>
          <div className="bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
                <tr>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Name</th>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Project</th>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Budget</th>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {newInquiries?.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-[#52525B]">No new inquiries.</td></tr>
                ) : newInquiries?.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="px-6 py-4 text-white">{item.name}</td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{item.project_type}</td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{item.budget}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[10px] uppercase font-mono tracking-wider">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">Recent Project Briefs</h2>
          <div className="bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
                <tr>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Project</th>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Type</th>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Budget</th>
                  <th className="px-6 py-4 font-medium text-[#A1A1AA]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {newBriefs?.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-[#52525B]">No new project briefs.</td></tr>
                ) : newBriefs?.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="px-6 py-4 text-white truncate max-w-xs">{item.projectName}</td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{item.project_type}</td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{item.budget}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-accent-purple/10 text-accent-purple border border-accent-purple/20 rounded text-[10px] uppercase font-mono tracking-wider">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
