import { createClient } from "@/lib/supabase/server"
import { logout } from "@/app/actions/auth"

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single()

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-medium tracking-widest uppercase">Admin Settings</h1>
        <p className="text-[#A1A1AA] mt-2">Manage your administrative account and preferences.</p>
      </header>

      <div className="bg-[#050505] p-8 rounded-xl border border-[rgba(255,255,255,0.05)] space-y-6">
        <div>
          <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">Account Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#52525B] uppercase tracking-wider mb-1">Email</label>
              <div className="text-white px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded">{user?.email}</div>
            </div>
            <div>
              <label className="block text-xs text-[#52525B] uppercase tracking-wider mb-1">Role</label>
              <div className="text-white px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded">{profile?.role || "unknown"}</div>
            </div>
            <div>
              <label className="block text-xs text-[#52525B] uppercase tracking-wider mb-1">Created At</label>
              <div className="text-white px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded">{new Date(user?.created_at || "").toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <h2 className="text-sm font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">Security</h2>
          <p className="text-xs text-[#52525B] mb-4">Password changes are handled via Supabase Authentication Dashboard or reset emails.</p>
          <form action={logout}>
            <button className="px-6 py-3 bg-red-500/10 text-red-500 font-medium rounded-lg hover:bg-red-500/20 transition-colors">
              Sign Out of Admin System
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
