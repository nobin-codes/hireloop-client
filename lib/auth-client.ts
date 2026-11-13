import { createAuthClient } from "better-auth/react"

// A single client instance: the server URL defaults to the current origin.
export const authClient = createAuthClient()

export const { signIn, signUp, signOut, useSession } = authClient
