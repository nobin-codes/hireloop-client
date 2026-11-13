import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type AuthFieldProps = {
  label: string
  id: string
} & ComponentProps<"input">

export function AuthField({ label, id, className, ...props }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-white/75">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-base text-white transition-colors outline-none placeholder:text-white/30 focus:border-brand focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}
