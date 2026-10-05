import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export default async function ContactsPage() {
  const supabase = await createClient()

  const { data: contacts } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  const updateStatus = async (formData: FormData) => {
    "use server"
    const id = formData.get("id") as string
    const status = formData.get("status") as string
    
    const supabase = await createClient()
    await supabase.from("contact_messages").update({ status }).eq("id", id)
    revalidatePath("/admin/contacts")
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-medium tracking-widest uppercase">Contact Messages</h1>
        <p className="text-[#A1A1AA] mt-2">Manage incoming messages and inquiries.</p>
      </header>

      <div className="space-y-4">
        {contacts?.length === 0 ? (
          <div className="bg-[#050505] p-8 rounded-xl border border-[rgba(255,255,255,0.05)] text-center text-[#52525B]">
            No contact messages found.
          </div>
        ) : contacts?.map((msg) => (
          <div key={msg.id} className="bg-[#050505] p-6 rounded-xl border border-[rgba(255,255,255,0.05)] grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider block mb-1">From</span>
              <p className="text-white font-medium">{msg.name}</p>
              <a href={`mailto:${msg.email}`} className="text-sm text-accent-purple hover:underline mt-1 block">{msg.email}</a>
              {msg.phone && <a href={`tel:${msg.phone}`} className="text-sm text-accent-purple hover:underline block">{msg.phone}</a>}
            </div>
            
            <div className="md:col-span-7">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">Subject: {msg.subject}</span>
                <span className="text-[10px] text-[#52525B] uppercase tracking-wider">{new Date(msg.created_at).toLocaleString()}</span>
              </div>
              <p className="text-white/80 whitespace-pre-wrap text-sm">{msg.message}</p>
            </div>
            
            <div className="md:col-span-2 flex flex-col justify-between items-end">
              <span className={`px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider border ${
                msg.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                msg.status === 'replied' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                'bg-[rgba(255,255,255,0.1)] text-white border-[rgba(255,255,255,0.2)]'
              }`}>
                {msg.status}
              </span>
              
              <form action={updateStatus} className="mt-4 w-full">
                <input type="hidden" name="id" value={msg.id} />
                <select 
                  name="status" 
                  defaultValue={msg.status}
                  onChange={(e) => e.target.form?.requestSubmit()}
                  className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-accent-purple"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
