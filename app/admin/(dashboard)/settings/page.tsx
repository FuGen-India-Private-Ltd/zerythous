import { createClient } from "@/lib/supabase/server"

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
}