"use client";
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
}