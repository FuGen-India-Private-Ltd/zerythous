import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"

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

  // Fetch admin role
  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("user_id", user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <AdminSidebar email={user.email} role={profile?.role || "UNKNOWN"} />

      {/* Main Content */}
      <div className="flex-1 ml-64 min-h-screen border-l border-[rgba(255,255,255,0.05)] bg-[#09090B]">
        {children}
      </div>
    </div>
  )
}
