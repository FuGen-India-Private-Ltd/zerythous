import { createClient } from "@/lib/supabase/server"
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
            <a href={`mailto:${inquiry.email}`} className="flex items-center hover:text-accent-purple transition-colors">
              <Mail size={14} className="mr-2" /> {inquiry.email}
            </a>
            {inquiry.phone && (
              <a href={`tel:${inquiry.phone}`} className="flex items-center hover:text-accent-purple transition-colors">
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
}