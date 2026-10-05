const fs = require('fs');
const path = require('path');

const files = {
  'app/admin/(dashboard)/inquiries/page.tsx': `import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import Link from "next/link"

export default async function InquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase.from("project_inquiries").select("*").order("created_at", { ascending: false })

  const updateStatus = async (formData: FormData) => {
    "use server"
    const id = formData.get("id") as string
    const status = formData.get("status") as string
    const supabase = await createClient()
    await supabase.from("project_inquiries").update({ status }).eq("id", id)
    revalidatePath("/admin/inquiries")
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-heading uppercase tracking-widest font-medium">Inquiries</h1>
        <p className="text-[#A1A1AA] mt-2 text-sm">Quick project inquiries and simple requests.</p>
      </div>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden w-full">
        {(!inquiries || inquiries.length === 0) ? (
          <div className="p-12 text-center text-[#52525B] text-sm flex flex-col items-center">
            <p className="font-medium text-white mb-2">NO INQUIRIES YET</p>
            <p>When visitors submit a project inquiry, it will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#070707] border-b border-[rgba(255,255,255,0.05)] text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono">
                <tr>
                  <th className="p-4 font-normal">Client</th>
                  <th className="p-4 font-normal">Project</th>
                  <th className="p-4 font-normal">Budget</th>
                  <th className="p-4 font-normal">Timeline</th>
                  <th className="p-4 font-normal">Priority</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Date</th>
                  <th className="p-4 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {inquiries.map(inquiry => (
                  <tr key={inquiry.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-white">{inquiry.name}</p>
                    </td>
                    <td className="p-4 text-white/80">{inquiry.project_type || 'N/A'}</td>
                    <td className="p-4 text-white/80">{inquiry.budget || 'N/A'}</td>
                    <td className="p-4 text-white/80">{inquiry.timeline || 'N/A'}</td>
                    <td className="p-4">
                      <span className={\`text-xs \${inquiry.priority === 'urgent' ? 'text-red-400' : inquiry.priority === 'high' ? 'text-amber-400' : 'text-emerald-400'}\`}>{inquiry.priority}</span>
                    </td>
                    <td className="p-4">
                      <form action={updateStatus}>
                        <input type="hidden" name="id" value={inquiry.id} />
                        <select 
                          name="status" 
                          defaultValue={inquiry.status}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-xs text-white rounded px-2 py-1 focus:border-accent-purple outline-none"
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="contacted">Contacted</option>
                          <option value="proposal">Proposal</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                          <option value="closed">Closed</option>
                        </select>
                      </form>
                    </td>
                    <td className="p-4 text-[#A1A1AA] text-xs">{new Date(inquiry.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <Link href={\`/admin/inquiries/\${inquiry.id}\`} className="text-xs text-accent-purple hover:text-white transition-colors">
                        View Details
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
}`,
  'app/admin/(dashboard)/inquiries/[id]/page.tsx': `import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, Building } from "lucide-react"

export default async function InquiryDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: inquiry } = await supabase.from("project_inquiries").select("*").eq("id", params.id).single()

  if (!inquiry) {
    redirect("/admin/inquiries")
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/admin/inquiries" className="inline-flex items-center text-xs text-[#A1A1AA] hover:text-white uppercase tracking-widest font-mono">
        <ArrowLeft size={14} className="mr-2" /> Back to Inquiries
      </Link>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
        <div className="p-8 border-b border-[rgba(255,255,255,0.05)]">
          <h1 className="text-2xl font-medium text-white mb-2">{inquiry.name}</h1>
          <div className="flex items-center space-x-6 text-sm text-[#A1A1AA]">
            <a href={\`mailto:\${inquiry.email}\`} className="flex items-center hover:text-accent-purple transition-colors">
              <Mail size={14} className="mr-2" /> {inquiry.email}
            </a>
            {inquiry.phone && (
              <a href={\`tel:\${inquiry.phone}\`} className="flex items-center hover:text-accent-purple transition-colors">
                <Phone size={14} className="mr-2" /> {inquiry.phone}
              </a>
            )}
            {inquiry.company && (
              <span className="flex items-center">
                <Building size={14} className="mr-2" /> {inquiry.company}
              </span>
            )}
          </div>
        </div>

        <div className="p-8 grid grid-cols-2 gap-8 border-b border-[rgba(255,255,255,0.05)]">
          <div>
            <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Project Type</h3>
            <p className="text-white text-sm">{inquiry.project_type || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Services</h3>
            <p className="text-white text-sm">{(inquiry.services_required || []).join(', ') || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Timeline</h3>
            <p className="text-white text-sm">{inquiry.timeline || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Budget</h3>
            <p className="text-white text-sm">{inquiry.budget || 'N/A'}</p>
          </div>
        </div>
        
        <div className="p-8">
          <h3 className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-4">Description</h3>
          <p className="text-white/90 text-sm whitespace-pre-wrap leading-relaxed">{inquiry.description || 'No description provided.'}</p>
        </div>
      </div>
    </div>
  )
}`
};

Object.keys(files).forEach(filepath => {
  const fullPath = path.join(__dirname, '..', filepath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, files[filepath]);
});

console.log('Inquiries construction complete.');
