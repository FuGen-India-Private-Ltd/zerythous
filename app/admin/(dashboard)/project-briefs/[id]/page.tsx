import { createClient } from "@/lib/supabase/server"
import { updateBriefStatus } from "@/app/actions/update-brief-status"
import { notFound } from "next/navigation"

export default async function ProjectBriefDetail({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: brief } = await supabase
    .from("project_briefs")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!brief) {
    notFound()
  }

  const handleStatusChange = async (formData: FormData) => {
    "use server"
    const status = formData.get("status") as string
    if (status) {
      await updateBriefStatus(brief.id, status)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-start mb-8">
        <div>
          <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-2">Project Brief</p>
          <h1 className="text-3xl font-heading font-medium text-white">{brief.requirements || "Unnamed Project"}</h1>
          <p className="text-[#A1A1AA] mt-2">Submitted {new Date(brief.created_at).toLocaleString()}</p>
        </div>
        
        <form action={handleStatusChange} className="flex flex-col items-end space-y-2">
          <label className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">Update Status</label>
          <div className="flex items-center space-x-2">
            <select
              name="status"
              defaultValue={brief.status}
              className="bg-[#050505] border border-[rgba(255,255,255,0.1)] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-purple"
            >
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="reviewing">Reviewing</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors">
              Save
            </button>
          </div>
        </form>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
          <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-6">Client Information</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Name</dt>
              <dd className="text-white">{brief.name}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Email</dt>
              <dd className="text-white">
                <a href={`mailto:${brief.email}`} className="text-accent-purple hover:underline">{brief.email}</a>
              </dd>
            </div>
            {brief.phone && (
              <div>
                <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Phone</dt>
                <dd className="text-white">
                  <a href={`tel:${brief.phone}`} className="text-accent-purple hover:underline">{brief.phone}</a>
                </dd>
              </div>
            )}
            {brief.company && (
              <div>
                <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Company</dt>
                <dd className="text-white">{brief.company}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
          <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-6">Project Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Type</dt>
              <dd className="text-white">{brief.project_type}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Timeline</dt>
              <dd className="text-white">{brief.timeline}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Budget</dt>
              <dd className="text-white">{brief.budget}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-1">Services Required</dt>
              <dd className="text-white">
                <div className="flex flex-wrap gap-2 mt-2">
                  {brief.services?.map((s: string) => (
                    <span key={s} className="px-2 py-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-xs">{s}</span>
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </div>

        {brief.additional_information && (
          <div className="col-span-1 md:col-span-2 bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)]">
            <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-6">Additional Information</h2>
            <div className="prose prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-white/80">{brief.additional_information}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
