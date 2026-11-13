"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const tabs = [
  { label: "Sign in", href: "/sign-in" },
  { label: "Sign up", href: "/sign-up" },
] as const

export function AuthTabs() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Switch between sign in and sign up"
      className="mb-7 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1"
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors",
              active
                ? "bg-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
