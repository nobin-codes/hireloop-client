"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

import { AuthField } from "@/components/auth/auth-field"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

type SignUpFormData = {
  name: string
  email: string
  password: string
}

export default function SignUpPage() {
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [createdEmail, setCreatedEmail] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const data: SignUpFormData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }

    setError(null)
    setCreatedEmail(null)
    setPending(true)

    try {
      const { error: signUpError } = await authClient.signUp.email(data)

      if (signUpError) {
        const alreadyRegistered =
          signUpError.code === "USER_ALREADY_EXISTS" ||
          signUpError.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"

        setError(
          alreadyRegistered
            ? "An account with this email already exists. Try signing in instead."
            : signUpError.code === "PASSWORD_TOO_SHORT"
              ? "Your password must be at least 8 characters long."
              : signUpError.status >= 500
                ? "Sign-up is temporarily unavailable. Please try again in a moment."
                : (signUpError.message ??
                  "Unable to create your account. Please try again.")
        )
        return
      }

      form.reset()
      setCreatedEmail(data.email)
    } catch {
      setError("Something went wrong. Check your connection and try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-[-0.6px] text-white">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-white/55">
          Join HireLoop and start applying in minutes.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-sm leading-[1.5] text-red-200"
          >
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <AuthField
          id="name"
          name="name"
          type="text"
          label="Full name"
          placeholder="Jane Doe"
          autoComplete="name"
          required
        />

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
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <Button
          type="submit"
          disabled={pending}
          className="mt-1 h-11 w-full rounded-xl text-base font-medium"
        >
          {pending ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      {createdEmail ? (
        <p
          role="status"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-3 text-sm leading-[1.5] text-emerald-100"
        >
          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            Account created for{" "}
            <span className="font-medium text-white">{createdEmail}</span>.
            You&apos;re signed in.
          </span>
        </p>
      ) : null}
    </div>
  )
}
