"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2 } from "lucide-react"

import { AuthField } from "@/components/auth/auth-field"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

type SignInFormData = {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const data: SignInFormData = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }

    setError(null)
    setPending(true)

    try {
      const { error: signInError } = await authClient.signIn.email(data)

      if (signInError) {
        const invalidCredentials =
          signInError.code === "INVALID_EMAIL_OR_PASSWORD" ||
          signInError.status === 400 ||
          signInError.status === 401

        setError(
          invalidCredentials
            ? "Incorrect email or password. Please try again."
            : signInError.code === "EMAIL_NOT_VERIFIED"
              ? "Please verify your email address before signing in."
              : signInError.status === 429
                ? "Too many attempts. Please wait a moment and try again."
                : signInError.status >= 500
                  ? "Sign-in is temporarily unavailable. Please try again in a moment."
                  : (signInError.message ??
                    "Unable to sign in. Please try again.")
        )
        return
      }

      // Signed in — go to the homepage.
      router.replace("/")
      router.refresh()
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
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-white/55">
          Sign in to continue to HireLoop.
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
          disabled={pending}
          className="mt-1 h-11 w-full rounded-xl text-base font-medium"
        >
          {pending ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  )
}
