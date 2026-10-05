import { createClient } from "@/lib/supabase/server"

export default async function InquiriesPage() {
  const supabase = await createClient()

  const { data: inquiries } = await supabase
    .from("project_inquiries")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-medium tracking-widest uppercase">Project Inquiries</h1>
        <p className="text-[#A1A1AA] mt-2">Manage incoming legacy inquiries.</p>
      </header>

      <div className="bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
            <tr>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Name</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Company</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Project Type</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Status</th>
              <th className="px-6 py-4 font-medium text-[#A1A1AA]">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
            {inquiries?.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-[#52525B]">No inquiries found.</td></tr>
            ) : inquiries?.map((item) => (
              <tr key={item.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="px-6 py-4">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-xs text-[#71717A] mt-1">{item.email}</p>
                </td>
                <td className="px-6 py-4 text-[#A1A1AA]">{item.company || "-"}</td>
                <td className="px-6 py-4 text-[#A1A1AA]">{item.project_type || "-"}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] rounded text-[10px] uppercase font-mono tracking-wider">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider border ${
                    item.priority === 'urgent' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    item.priority === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                    'bg-[rgba(255,255,255,0.1)] text-white border-[rgba(255,255,255,0.2)]'
                  }`}>
                    {item.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
