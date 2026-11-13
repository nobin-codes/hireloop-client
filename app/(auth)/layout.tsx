import type { ReactNode } from "react"

import { AuthTabs } from "@/components/auth/auth-tabs"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-7rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[#614ffb]/20 blur-[160px]" />
      </div>

      <div className="w-full max-w-[440px] rounded-3xl border border-white/[0.08] bg-[#141418] p-6 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] sm:p-8">
        <AuthTabs />
        {children}
      </div>
    </main>
  )
}
