import { createClient } from "@/lib/supabase/server"
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
            <p className="text-4xl font-medium tracking-tight mb-2">{stat.value < 10 ? `0${stat.value}` : stat.value}</p>
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
}