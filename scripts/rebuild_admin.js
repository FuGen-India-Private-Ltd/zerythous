const fs = require('fs');
const path = require('path');

const files = {
  'components/admin/AdminSidebar.tsx': `"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, FileText, Settings, LogOut, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/app/actions/auth';

export default function AdminSidebar({ email, role }: { email?: string, role?: string }) {
  const pathname = usePathname();

  const navGroups = [
    {
      title: "OVERVIEW",
      links: [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "CLIENT WORK",
      links: [
        { name: "Inquiries", href: "/admin/inquiries", icon: Activity },
        { name: "Project Briefs", href: "/admin/project-briefs", icon: FileText }
      ]
    },
    {
      title: "COMMUNICATION",
      links: [
        { name: "Contacts", href: "/admin/contacts", icon: MessageSquare }
      ]
    },
    {
      title: "SYSTEM",
      links: [
        { name: "Settings", href: "/admin/settings", icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-[260px] fixed top-0 left-0 h-screen bg-[#070707] border-r border-[rgba(255,255,255,0.08)] flex flex-col z-50 text-white font-sans">
      <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
        <h1 className="text-lg font-heading font-medium tracking-widest uppercase text-white">Zerythous</h1>
        <p className="text-[10px] text-[#A1A1AA] mt-1 tracking-widest font-mono uppercase">Private Operations</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {navGroups.map((group, i) => (
          <div key={i}>
            <h3 className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest mb-3 px-3">{group.title}</h3>
            <ul className="space-y-1">
              {group.links.map(link => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isActive ? "bg-[#0D0D0F] text-white font-medium border border-[rgba(255,255,255,0.08)]" : "text-[#A1A1AA] hover:text-white hover:bg-[#0D0D0F]"
                    )}>
                      <link.icon size={16} className={cn("mr-3", isActive ? "text-accent-purple" : "text-[#A1A1AA]")} />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#0D0D0F]">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-white truncate">{email}</p>
            <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">{role?.replace('_', ' ')}</p>
          </div>
        </div>
        <form action={logout}>
          <button type="submit" className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:text-white transition-colors text-xs font-medium border border-[rgba(255,255,255,0.05)]">
            <LogOut size={14} className="mr-2" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}`,
  'components/admin/AdminHeader.tsx': `"use client";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.includes('/contacts')) return "Contacts";
    if (pathname.includes('/project-briefs')) return "Project Briefs";
    if (pathname.includes('/inquiries')) return "Inquiries";
    if (pathname.includes('/settings')) return "Settings";
    return "Dashboard";
  };

  return (
    <header className="h-[72px] sticky top-0 z-40 bg-[#070707]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] px-8 flex items-center justify-between text-white w-full">
      <h2 className="text-xl font-medium tracking-wide">{getPageTitle()}</h2>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-xs font-mono text-[#A1A1AA]">
          <span className="w-2 h-2 rounded-full bg-success mr-2 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse"></span>
          OPERATIONAL
        </div>
        <button className="text-[#A1A1AA] hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-purple rounded-full"></span>
        </button>
      </div>
    </header>
  );
}`,
  'app/admin/(dashboard)/layout.tsx': `import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { Toaster } from "react-hot-toast"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("user_id", user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#070707] text-white flex font-sans selection:bg-accent-purple/30 selection:text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: '#0D0D0F', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' } }} />
      <AdminSidebar email={user.email} role={profile?.role || "UNKNOWN"} />
      <div className="flex-1 ml-[260px] min-h-screen flex flex-col overflow-x-hidden relative">
        <AdminHeader />
        <main className="flex-1 p-8 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
        <footer className="h-12 border-t border-[rgba(255,255,255,0.05)] bg-[#070707] flex items-center justify-between px-8 text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono w-full">
          <span>Zerythous Internal System</span>
          <span>v1.0.0</span>
        </footer>
      </div>
    </div>
  )
}`,
  'app/admin/(dashboard)/dashboard/page.tsx': `import { createClient } from "@/lib/supabase/server"
import { Activity, MessageSquare, FileText, Briefcase } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ count: contactsCount }, { count: briefsCount }, { count: inquiriesCount }] = await Promise.all([
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('project_briefs').select('*', { count: 'exact', head: true }).in('status', ['submitted', 'reviewing']),
    supabase.from('project_inquiries').select('*', { count: 'exact', head: true }).in('status', ['new', 'reviewing'])
  ]);

  const stats = [
    { title: "NEW INQUIRIES", value: inquiriesCount || 0, desc: "Awaiting review", icon: Activity, color: "text-accent-purple" },
    { title: "PROJECT BRIEFS", value: briefsCount || 0, desc: "Require attention", icon: FileText, color: "text-blue-400" },
    { title: "UNREAD CONTACTS", value: contactsCount || 0, desc: "Unread messages", icon: MessageSquare, color: "text-amber-400" },
    { title: "ACTIVE PROJECTS", value: 0, desc: "Currently active", icon: Briefcase, color: "text-emerald-400" }
  ];

  const { data: recentContacts } = await supabase.from('contact_messages').select('created_at').order('created_at', { ascending: false }).limit(2);
  const { data: recentBriefs } = await supabase.from('project_briefs').select('created_at').order('created_at', { ascending: false }).limit(2);
  
  const activities = [
    ...(recentContacts || []).map(c => ({ type: 'Contact message received', date: new Date(c.created_at) })),
    ...(recentBriefs || []).map(b => ({ type: 'New project brief received', date: new Date(b.created_at) }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading uppercase tracking-widest font-medium">Zerythous Operations</h1>
        <p className="text-[#A1A1AA] mt-2">System overview and incoming client activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <stat.icon size={48} className={stat.color} />
            </div>
            <p className="text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono mb-2">{stat.title}</p>
            <p className="text-4xl font-medium tracking-tight mb-2">{stat.value < 10 ? \`0\${stat.value}\` : stat.value}</p>
            <p className="text-xs text-[#52525B]">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
        <h3 className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {activities.length > 0 ? activities.map((activity, i) => (
            <div key={i} className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-accent-purple mt-1.5 mr-4 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
              <div>
                <p className="text-sm text-white">{activity.type}</p>
                <p className="text-xs text-[#52525B] mt-1">{activity.date.toLocaleString()}</p>
              </div>
            </div>
          )) : (
            <p className="text-sm text-[#52525B]">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  )
}`,
  'app/admin/(dashboard)/contacts/page.tsx': `import { createClient } from "@/lib/supabase/server"
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
            <Link key={f} href={\`/admin/contacts?filter=\${f}\`} className={\`px-4 py-1.5 rounded text-xs uppercase tracking-wider transition-colors \${filter === f ? 'bg-[rgba(255,255,255,0.1)] text-white' : 'text-[#A1A1AA] hover:text-white'}\`}>
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
                      <a href={\`mailto:\${contact.email}\`} className="text-[#A1A1AA] text-xs hover:text-accent-purple">{contact.email}</a>
                    </td>
                    <td className="p-4">
                      <p className="text-white/80 max-w-[300px] truncate">{contact.subject}</p>
                    </td>
                    <td className="p-4 text-[#A1A1AA] text-xs">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={\`px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider border \${
                        contact.status === 'new' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        contact.status === 'replied' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border-[rgba(255,255,255,0.1)]'
                      }\`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Link href={\`/admin/contacts/\${contact.id}\`} className="text-xs text-accent-purple hover:text-white px-3 py-1.5 rounded bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
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
}`,
  'app/admin/(dashboard)/contacts/[id]/page.tsx': `import { createClient } from "@/lib/supabase/server"
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
    revalidatePath(\`/admin/contacts/\${params.id}\`)
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
              <a href={\`mailto:\${contact.email}\`} className="flex items-center hover:text-accent-purple transition-colors">
                <Mail size={14} className="mr-2" /> {contact.email}
              </a>
              {contact.phone && (
                <a href={\`tel:\${contact.phone}\`} className="flex items-center hover:text-accent-purple transition-colors">
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
              <span className={\`px-3 py-1 rounded text-xs uppercase font-mono tracking-wider border \${
                contact.status === 'new' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                contact.status === 'replied' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border-[rgba(255,255,255,0.1)]'
              }\`}>
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
            href={\`mailto:\${contact.email}?subject=Re: \${encodeURIComponent(contact.subject)}\`}
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
}`,
  'app/admin/(dashboard)/project-briefs/page.tsx': `import { createClient } from "@/lib/supabase/server"
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
                      <span className={\`px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider border \${
                        brief.status === 'submitted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        brief.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        brief.status === 'closed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border-[rgba(255,255,255,0.1)]'
                      }\`}>
                        {brief.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={\`/admin/project-briefs/\${brief.id}\`} className="text-xs text-accent-purple hover:text-white px-3 py-1.5 rounded bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
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
}`,
  'app/admin/(dashboard)/settings/page.tsx': `import { createClient } from "@/lib/supabase/server"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("admin_profiles").select("*").eq("user_id", user?.id).single()

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading uppercase tracking-widest font-medium">System Settings</h1>
        <p className="text-[#A1A1AA] mt-2 text-sm">Manage your account and view system status.</p>
      </div>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-8">
        <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">Account Information</h2>
        
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-3 py-2 border-b border-[rgba(255,255,255,0.02)]">
            <span className="text-[#A1A1AA]">Email</span>
            <span className="col-span-2 text-white font-medium">{user?.email}</span>
          </div>
          <div className="grid grid-cols-3 py-2 border-b border-[rgba(255,255,255,0.02)]">
            <span className="text-[#A1A1AA]">Role</span>
            <span className="col-span-2 text-white font-medium uppercase">{profile?.role?.replace('_', ' ') || 'Admin'}</span>
          </div>
          <div className="grid grid-cols-3 py-2">
            <span className="text-[#A1A1AA]">User ID</span>
            <span className="col-span-2 text-[#52525B] font-mono text-xs">{user?.id}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-8">
        <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">System Status</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg">
            <p className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Database</p>
            <p className="text-emerald-400 text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span> CONNECTED
            </p>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg">
            <p className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Auth</p>
            <p className="text-emerald-400 text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span> SECURE
            </p>
          </div>
          <div className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg">
            <p className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase mb-1">Environment</p>
            <p className="text-accent-purple text-xs font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mr-2"></span> PRODUCTION
            </p>
          </div>
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

console.log('Admin reconstruction complete.');
