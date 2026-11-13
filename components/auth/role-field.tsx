"use client"

import * as React from "react"

export const userRoles = [
  { value: "seeker", label: "Seeker", hint: "Looking for a job" },
  { value: "recruiter", label: "Recruiter", hint: "Hiring talent" },
  { value: "admin", label: "Admin", hint: "Manage the platform" },
] as const

export type UserRole = (typeof userRoles)[number]["value"]

export function RoleField({ defaultValue = "seeker" }: { defaultValue?: UserRole }) {
  const [selected, setSelected] = React.useState<UserRole>(defaultValue)

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-white/75">
        I am joining as a
      </legend>

      <div className="grid grid-cols-3 gap-2">
        {userRoles.map((role) => (
          <label key={role.value} className="cursor-pointer">
            <input
              type="radio"
              name="role"
              value={role.value}
              checked={selected === role.value}
              onChange={() => setSelected(role.value)}
              className="peer sr-only"
            />
            <span className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-white/65 transition-colors peer-checked:border-brand peer-checked:bg-brand/15 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 peer-focus-visible:outline-none">
              {role.label}
            </span>
          </label>
        ))}
      </div>

      <p className="text-xs text-white/40">
        {userRoles.find((role) => role.value === selected)?.hint}
      </p>
    </fieldset>
  )
}
