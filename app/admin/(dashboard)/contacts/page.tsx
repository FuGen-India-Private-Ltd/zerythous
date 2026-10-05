import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import Link from "next/link"

export default async function ContactsPage({ searchParams }: { searchParams: { filter?: string } }) {
  const supabase = await createClient()
  const filter = searchParams.filter || 'all';

  let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
  if (filter !== 'all') {
    query = query.eq('status', filter)
  }

  const { data: contacts } = await query

  const updateStatus = async (formData: FormData) => {
    "use server"
    const id = formData.get("id") as string
    const status = formData.get("status") as string
    const supabase = await createClient()
    await supabase.from("contact_messages").update({ status }).eq("id", id)
    revalidatePath("/admin/contacts")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-heading uppercase tracking-widest font-medium">Contacts</h1>
          <p className="text-[#A1A1AA] mt-2 text-sm">Client messages and inquiries from the public site.</p>
        </div>
        <div className="flex space-x-2 bg-[#0D0D0F] p-1 rounded-lg border border-[rgba(255,255,255,0.08)]">
          {['all', 'new', 'read', 'replied', 'archived'].map(f => (
            <Link key={f} href={`/admin/contacts?filter=${f}`} className={`px-4 py-1.5 rounded text-xs uppercase tracking-wider transition-colors ${filter === f ? 'bg-[rgba(255,255,255,0.1)] text-white' : 'text-[#A1A1AA] hover:text-white'}`}>
              {f}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden w-full">
        {(!contacts || contacts.length === 0) ? (
          <div className="p-12 text-center text-[#52525B] text-sm">
            NO CONTACT MESSAGES FOUND
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#070707] border-b border-[rgba(255,255,255,0.05)] text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono">
                <tr>
                  <th className="p-4 font-normal">Client</th>
                  <th className="p-4 font-normal">Subject</th>
                  <th className="p-4 font-normal">Date</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {contacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-white">{contact.name}</p>
                      <a href={`mailto:${contact.email}`} className="text-[#A1A1AA] text-xs hover:text-accent-purple">{contact.email}</a>
                    </td>
                    <td className="p-4">
                      <p className="text-white/80 max-w-[300px] truncate">{contact.subject}</p>
                    </td>
                    <td className="p-4 text-[#A1A1AA] text-xs">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider border ${
                        contact.status === 'new' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        contact.status === 'replied' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border-[rgba(255,255,255,0.1)]'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/contacts/${contact.id}`} className="text-xs text-accent-purple hover:text-white px-3 py-1.5 rounded bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
                          View
                        </Link>
                        <form action={updateStatus}>
                          <input type="hidden" name="id" value={contact.id} />
                          <input type="hidden" name="status" value={contact.status === 'new' ? 'read' : 'new'} />
                          <button type="submit" className="text-xs text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
                            {contact.status === 'new' ? 'Mark Read' : 'Unread'}
                          </button>
                        </form>
                      </div>
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