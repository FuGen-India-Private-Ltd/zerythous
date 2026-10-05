import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, Calendar } from "lucide-react"

export default async function ContactDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: contact } = await supabase.from("contact_messages").select("*").eq("id", params.id).single()

  if (!contact) {
    redirect("/admin/contacts")
  }

  const updateStatus = async (formData: FormData) => {
    "use server"
    const status = formData.get("status") as string
    const supabase = await createClient()
    await supabase.from("contact_messages").update({ status }).eq("id", params.id)
    revalidatePath(`/admin/contacts/${params.id}`)
    revalidatePath("/admin/contacts")
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/admin/contacts" className="inline-flex items-center text-xs text-[#A1A1AA] hover:text-white uppercase tracking-widest font-mono">
        <ArrowLeft size={14} className="mr-2" /> Back to Contacts
      </Link>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
        <div className="p-8 border-b border-[rgba(255,255,255,0.05)] flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-medium text-white mb-2">{contact.name}</h1>
            <div className="flex items-center space-x-6 text-sm text-[#A1A1AA]">
              <a href={`mailto:${contact.email}`} className="flex items-center hover:text-accent-purple transition-colors">
                <Mail size={14} className="mr-2" /> {contact.email}
              </a>
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center hover:text-accent-purple transition-colors">
                  <Phone size={14} className="mr-2" /> {contact.phone}
                </a>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="flex items-center text-[#52525B] text-xs font-mono uppercase tracking-widest justify-end">
              <Calendar size={12} className="mr-2" /> {new Date(contact.created_at).toLocaleString()}
            </p>
            <div className="mt-3 inline-block">
              <span className={`px-3 py-1 rounded text-xs uppercase font-mono tracking-wider border ${
                contact.status === 'new' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                contact.status === 'replied' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border-[rgba(255,255,255,0.1)]'
              }`}>
                STATUS: {contact.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">Subject</h2>
          <p className="text-lg font-medium text-white mb-8 pb-8 border-b border-[rgba(255,255,255,0.05)]">{contact.subject}</p>
          
          <h2 className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">Message</h2>
          <p className="text-white/90 whitespace-pre-wrap leading-relaxed text-sm">{contact.message}</p>
        </div>

        <div className="p-6 bg-[#070707] border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between">
          <a 
            href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
            className="px-6 py-2 bg-accent-purple text-white rounded-lg text-sm font-medium hover:bg-accent-purple/90 transition-colors"
          >
            Email Client
          </a>

          <form action={updateStatus} className="flex items-center space-x-3">
            <select name="status" defaultValue={contact.status} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-accent-purple">
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white rounded-lg text-sm transition-colors border border-[rgba(255,255,255,0.05)]">
              Update Status
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}