import { createClient } from "@/lib/supabase/server"
import { Activity, MessageSquare, FileText, Briefcase, Kanban, FolderGit2, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const [{ count: contactsCount }, { count: briefsCount }, { count: inquiriesCount }] = await Promise.all([
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('project_briefs').select('*', { count: 'exact', head: true }).in('status', ['submitted', 'reviewing']),
    supabase.from('project_inquiries').select('*', { count: 'exact', head: true }).in('status', ['new', 'reviewing'])
  ]);

  const stats = [
    { title: "NEW INQUIRIES", value: inquiriesCount || 0, desc: "Awaiting triage", icon: Activity, color: "text-accent-purple", href: "/admin/inquiries" },
    { title: "PROJECT BRIEFS", value: briefsCount || 0, desc: "Architectural scoping", icon: FileText, color: "text-blue-400", href: "/admin/project-briefs" },
    { title: "UNREAD CONTACTS", value: contactsCount || 0, desc: "Direct messages", icon: MessageSquare, color: "text-amber-400", href: "/admin/contacts" },
    { title: "ACTIVE PIPELINE", value: 4, desc: "Ongoing projects & labs", icon: Briefcase, color: "text-emerald-400", href: "/admin/pipeline" }
  ];

  const { data: recentContacts } = await supabase.from('contact_messages').select('created_at').order('created_at', { ascending: false }).limit(2);
  const { data: recentBriefs } = await supabase.from('project_briefs').select('created_at').order('created_at', { ascending: false }).limit(2);
  
  const activities = [
    ...(recentContacts || []).map(c => ({ type: 'Contact message received', date: new Date(c.created_at) })),
    ...(recentBriefs || []).map(b => ({ type: 'New project brief received', date: new Date(b.created_at) }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const quickActions = [
    { title: "Process Pipeline", desc: "Kanban lifecycle of discovery to delivery", href: "/admin/pipeline", icon: Kanban, badge: "OPERATIONS" },
    { title: "Projects & Work CMS", desc: "Manage client portfolio case studies & repos", href: "/admin/cms/projects", icon: FolderGit2, badge: "CMS" },
    { title: "Security Audit Center", desc: "15/15 Vibe Coded App Security Checklist", href: "/admin/security", icon: ShieldCheck, badge: "100% PASS" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading uppercase tracking-widest font-medium">Zerythous Operations</h1>
        <p className="text-[#A1A1AA] mt-2">Executive dashboard for client acquisitions, engineering pipeline, and platform security.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 relative overflow-hidden group hover:border-[rgba(255,255,255,0.2)] transition-all duration-300 block"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <stat.icon size={48} className={stat.color} />
            </div>
            <p className="text-[10px] text-[#A1A1AA] uppercase tracking-widest font-mono mb-2">{stat.title}</p>
            <p className="text-4xl font-medium tracking-tight mb-2 text-white">{stat.value < 10 ? `0${stat.value}` : stat.value}</p>
            <p className="text-xs text-[#52525B]">{stat.desc}</p>
          </Link>
        ))}
      </div>

      {/* Quick Launch Hub */}
      <div>
        <h2 className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">Command & Control Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((qa, i) => (
            <Link
              key={i}
              href={qa.href}
              className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] hover:border-accent-purple/50 rounded-xl p-6 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-accent-purple group-hover:scale-105 transition-transform">
                    <qa.icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[#A1A1AA]">
                    {qa.badge}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-accent-purple transition-colors">{qa.title}</h3>
                <p className="text-xs text-[#71717A] mt-1">{qa.desc}</p>
              </div>

              <div className="mt-6 flex items-center text-xs font-mono text-[#A1A1AA] group-hover:text-white transition-colors">
                Open Module <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#0D0D0F] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
        <h3 className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-6">Recent Activity Feed</h3>
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
            <p className="text-sm text-[#52525B]">No recent activity recorded.</p>
          )}
        </div>
      </div>
    </div>
  )
}