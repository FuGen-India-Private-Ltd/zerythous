"use client"

import { login } from "@/app/actions/auth"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    const result = await login(formData)
    setIsLoading(false)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-heading font-medium tracking-widest text-white uppercase">
          Zerythous
        </h2>
        <p className="mt-2 text-center text-sm text-[#A1A1AA] uppercase tracking-widest font-mono">
          Private Admin System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#050505] py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-[rgba(255,255,255,0.05)]">
          <form className="space-y-6" action={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-mono tracking-widest text-[#A1A1AA] uppercase">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-white placeholder-gray-400 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono tracking-widest text-[#A1A1AA] uppercase">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-white placeholder-gray-400 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple sm:text-sm transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-accent-purple hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center items-center rounded-md border border-transparent bg-white px-4 py-3 text-sm font-medium uppercase tracking-widest text-black shadow-sm hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                SIGN IN →
              </button>
            </div>
          </form>
        </div>
        <p className="mt-8 text-center text-xs text-[#52525B] uppercase tracking-widest">
          Authorized personnel only.
        </p>
      </div>
    </div>
  )
}
