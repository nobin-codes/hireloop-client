"use client"

import * as React from "react"

import { AuthField } from "@/components/auth/auth-field"
import { Button } from "@/components/ui/button"

type SignInFormData = {
  email: string
  password: string
}

export default function SignInPage() {
  const [captured, setCaptured] = React.useState<SignInFormData | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data: SignInFormData = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }

    // TODO: send `data` to your auth provider, e.g.:
    // await authClient.signIn.email({ email: data.email, password: data.password })
    console.log("[sign-in] form data:", data)
    setCaptured(data)
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-[-0.6px] text-white">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-white/55">
          Sign in to continue to HireLoop.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <AuthField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <Button
          type="submit"
          className="mt-1 h-11 w-full rounded-xl text-base font-medium"
        >
          Sign in
        </Button>
      </form>

      {captured ? (
        <p
          role="status"
          className="mt-5 rounded-xl border border-brand/30 bg-brand/10 px-3.5 py-3 text-sm leading-[1.5] text-white/80"
        >
          Form data captured for{" "}
          <span className="font-medium text-white">{captured.email}</span>.
          Check the console for the full object.
        </p>
      ) : null}
    </div>
  )
}
