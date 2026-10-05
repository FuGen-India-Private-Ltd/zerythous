"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FolderKanban, Settings, LogOut, Mail, Send } from "lucide-react"
import { logout } from "@/app/actions/auth"

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Inquiries", href: "/admin/inquiries", icon: Send },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Project Briefs", href: "/admin/project-briefs", icon: FolderKanban },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar({ email, role }: { email: string | undefined; role: string }) {
  const pathname = usePathname()

  // Do not render sidebar on login page
  if (pathname === "/admin/login") return null

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#050505] flex flex-col justify-between border-r border-[rgba(255,255,255,0.05)] z-40">
      <div>
        <div className="h-20 flex items-center px-8 border-b border-[rgba(255,255,255,0.05)]">
          <Link href="/admin/dashboard" className="text-xl font-heading tracking-widest text-white uppercase font-medium">
            Zerythous
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.1)]"
                    : "text-[#A1A1AA] hover:bg-[rgba(255,255,255,0.02)] hover:text-white border border-transparent"
                }`}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="px-4 py-3 mb-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg">
          <p className="text-xs text-[#A1A1AA] truncate">{email}</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent-purple mt-1">{role.replace("_", " ")}</p>
        </div>
        <form action={logout}>
          <button className="flex w-full items-center px-4 py-3 text-sm font-medium text-[#A1A1AA] rounded-lg hover:bg-[rgba(255,255,255,0.02)] hover:text-white transition-colors">
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}
