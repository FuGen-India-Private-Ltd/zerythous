"use client";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.includes('/contacts')) return "Client Messages & Contacts";
    if (pathname.includes('/project-briefs')) return "Project Briefs";
    if (pathname.includes('/inquiries')) return "Client Inquiries";
    if (pathname.includes('/pipeline')) return "Agency Process Pipeline";
    if (pathname.includes('/cms/projects')) return "CMS: Projects & Case Studies";
    if (pathname.includes('/cms/services')) return "CMS: Services & Capabilities";
    if (pathname.includes('/cms/team')) return "CMS: Team Leadership";
    if (pathname.includes('/security')) return "Security & Compliance Center";
    if (pathname.includes('/settings')) return "System Settings";
    return "Operations Dashboard";
  };

  return (
    <header className="h-[72px] sticky top-0 z-40 bg-[#070707]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] px-8 flex items-center justify-between text-white w-full">
      <h2 className="text-lg font-medium tracking-wide">{getPageTitle()}</h2>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-xs font-mono text-[#A1A1AA]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse"></span>
          OPERATIONAL
        </div>
        <button className="text-[#A1A1AA] hover:text-white transition-colors relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-purple rounded-full"></span>
        </button>
      </div>
    </header>
  );
}