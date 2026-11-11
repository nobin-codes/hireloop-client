import Image from "next/image"
import Link from "next/link"
import { MapPin, Rocket, Search, Star, Trophy, Users } from "lucide-react"

import stars from "@/app/image/stars.png"
import { cn } from "@/lib/utils"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const stats = [
  { icon: Search, value: "50K", label: "Active Jobs" },
  { icon: Trophy, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
] as const

function SearchField({
  icon: Icon,
  name,
  placeholder,
  className,
}: {
  icon: typeof Search
  name: string
  placeholder: string
  className?: string
}) {
  return (
    <label
      className={cn(
        "flex h-12 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 sm:h-auto sm:px-0",
        className
      )}
    >
      <Icon aria-hidden className="size-5 shrink-0 text-white/80" />
      <span className="sr-only">{placeholder}</span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        className="h-11 w-full min-w-0 bg-transparent text-base leading-[1.7] text-white placeholder:text-white/70 focus-visible:outline-none"
      />
    </label>
  )
}

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#010103] text-white">
      {/* Ambient background: purple glow, star field and the giant dark sphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[460px]">
          <div className="absolute -top-[110px] left-1/2 h-[300px] w-[1840px] -translate-x-1/2 rounded-[50%] bg-[#614ffb]/35 blur-[200px]" />
          <div className="absolute -top-[80px] left-[40%] h-[220px] w-[1300px] -translate-x-1/2 rounded-[50%] bg-[#dc02ce]/15 blur-[200px]" />
        </div>

        <div className="absolute left-1/2 top-[300px] w-[1180px] max-w-[130vw] -translate-x-1/2 sm:top-[380px] lg:top-[454px]">
          <Image
            src={stars}
            alt=""
            sizes="1180px"
            className="h-auto w-full opacity-90"
          />
        </div>

        <div className="absolute left-1/2 top-[520px] h-[460px] w-[1200px] -translate-x-1/2 rounded-[50%] bg-[#8f9cd8]/10 blur-[80px] sm:top-[600px] lg:top-[660px]" />

        <div className="absolute bottom-[-360px] left-1/2 h-[720px] w-[840px] -translate-x-1/2 sm:bottom-[-320px] sm:h-[900px] sm:w-[1050px] lg:-bottom-[377px] lg:h-[1037px] lg:w-[1208px]">
          <div className="absolute -inset-x-[16px] -top-[8px] bottom-0 rounded-full bg-[#5c53fe]/45 blur-[120px]" />
          <div className="absolute inset-0 rounded-full bg-[#010103] shadow-[inset_0_40px_110px_-30px_rgba(92,83,254,0.45)]" />
          <div className="absolute inset-0 rounded-full opacity-60 blur-[2px] [background:radial-gradient(closest-side,transparent_62%,rgba(92,83,254,0.55)_86%,rgba(92,83,254,0.9)_98%,rgba(92,83,254,0.2)_100%)]" />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative mx-auto w-full max-w-[784px] px-5 pt-16 sm:px-6 sm:pt-24 lg:px-0 lg:pt-[194px]">
        <div className="flex w-full flex-col items-center gap-10 sm:gap-12">
          <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
            <div className="flex items-center">
              <span
                aria-hidden
                className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#a8a8a8] sm:block"
              />
              <div className="rounded-full p-px [background:conic-gradient(from_140deg_at_50%_50%,rgba(168,168,168,0),rgba(168,168,168,0.55),rgba(92,83,254,0.35),rgba(255,255,255,0.12),rgba(168,168,168,0))]">
                <div className="flex items-center gap-2.5 rounded-full bg-gradient-to-b from-[#474747] to-[#010102] px-4 py-2 shadow-[inset_0_0_6px_rgba(0,0,0,0.1)] sm:gap-4 sm:px-6 sm:py-3">
                  <Rocket
                    aria-hidden
                    strokeWidth={1.6}
                    className="size-5 text-[#c9c4ff] sm:size-6"
                  />
                  <span className="font-space-mono text-[13px] leading-[1.2] whitespace-nowrap text-white sm:text-base lg:text-xl">
                    50,000+ new jobs this month
                  </span>
                </div>
              </div>
              <span
                aria-hidden
                className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#a8a8a8] sm:block"
              />
            </div>

            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h1 className="text-center font-manrope text-[34px] leading-[1.15] font-bold tracking-[-1.2px] text-white sm:text-[44px] sm:tracking-[-1.6px] lg:text-[56px] lg:tracking-[-2px]">
                Find Your Dream Job Today
              </h1>
              <p className="text-center font-manrope text-base leading-[1.6] text-white/70 sm:text-lg lg:text-xl">
                HireLoop connects top talent with world-class companies. Browse
                thousands of curated opportunities and land your next role —
                faster.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6">
            <form
              action="/jobs"
              method="get"
              role="search"
              className="flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 transition-colors focus-within:border-white/35 sm:flex-row sm:items-center sm:gap-6 sm:py-2 sm:pr-2 sm:pl-6"
            >
              <SearchField
                icon={Search}
                name="q"
                placeholder="Job title, skill or company"
              />

              <span
                aria-hidden
                className="mx-2 h-px shrink-0 bg-white/20 sm:mx-0 sm:h-6 sm:w-px"
              />

              <SearchField
                icon={MapPin}
                name="location"
                placeholder="Location or Remote"
              />

              <button
                type="submit"
                aria-label="Search jobs"
                className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-brand text-white transition-colors hover:bg-[#6b63ff] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none sm:w-12"
              >
                <Search aria-hidden className="size-6" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              <span className="font-manrope text-[15px] leading-[1.3] text-white/70 sm:text-base">
                Trending Position
              </span>
              <ul className="flex flex-wrap items-center justify-center gap-2">
                {trendingPositions.map((position) => (
                  <li key={position}>
                    <Link
                      href={`/jobs?q=${encodeURIComponent(position)}`}
                      className="inline-flex items-center rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 font-manrope text-sm leading-[1.5] text-white transition-colors hover:border-white/25 hover:bg-[#242426] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                    >
                      {position}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Live stats */}
      <div className="relative mx-auto w-full max-w-[1440px] px-5 pt-24 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-[60px] lg:pt-[358px] lg:pb-24">
        <p className="mx-auto max-w-[600px] text-center font-manrope text-2xl leading-[1.3] font-medium tracking-[-0.6px] text-white/70 sm:text-3xl lg:text-[40px] lg:tracking-[-1px]">
          Assisting over 15,000 job seekers find their dream positions.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4 xl:gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col gap-10 rounded-2xl border border-white/10 bg-gradient-to-b from-[#010102] to-[#313131] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35)] lg:gap-[72px]"
            >
              <Icon aria-hidden strokeWidth={1.5} className="size-6 text-white" />
              <div className="flex flex-col gap-3 lg:gap-4">
                <span className="font-manrope text-4xl leading-[1.15] font-semibold tracking-[-1.5px] text-white sm:text-5xl lg:text-[56px] lg:tracking-[-2px]">
                  {value}
                </span>
                <span className="text-base text-white/70 lg:text-lg">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
