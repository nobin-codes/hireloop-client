"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import logo from "@/app/image/logo.png"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={logo}
        alt="HireLoop"
        preload
        className="h-8 w-auto sm:h-9 lg:h-11"
      />
    </Link>
  )
}

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="w-full px-4 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 rounded-[14px] border border-white/[0.07] bg-nav-surface pl-4 pr-2 shadow-[0_1px_2px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.04)] sm:pl-6 lg:h-[68px] lg:gap-6 lg:pr-0">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden h-[52px] items-center gap-6 rounded-[8px] border border-white/[0.07] bg-nav-raised pl-6 pr-2 lg:flex"
        >
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-base leading-[1.8] tracking-[-0.2px] text-nav-foreground/90 transition-colors hover:text-white",
                      active && "font-semibold text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <span aria-hidden className="h-6 w-px shrink-0 bg-[#a8a8a8]/40" />

          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-9 px-4 text-base font-semibold text-brand-muted hover:bg-white/5 hover:text-brand"
              )}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-[52px] rounded-[8px] bg-brand px-5 text-base font-medium text-nav-foreground shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#6b63ff]"
              )}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="text-nav-foreground hover:bg-white/5 lg:hidden"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open main menu</span>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[min(20rem,85vw)] border-white/[0.07] bg-nav-surface text-nav-foreground sm:max-w-xs"
          >
            <SheetHeader className="border-b border-white/[0.07] p-5">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Links to the main pages of HireLoop.
              </SheetDescription>
              <Logo />
            </SheetHeader>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base tracking-[-0.2px] text-nav-foreground/90 transition-colors hover:bg-white/[0.06] hover:text-white",
                      active && "bg-white/[0.06] font-semibold text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-2 border-t border-white/[0.07] p-5">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 w-full border-white/10 bg-transparent text-brand-muted hover:bg-white/5 hover:text-brand"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full rounded-[8px] bg-brand text-base font-medium text-nav-foreground shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#6b63ff]"
                )}
              >
                Get Started
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
