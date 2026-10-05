import { createClient } from "@/lib/supabase/server"
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
}