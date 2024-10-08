"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"
import { Loader2 } from "lucide-react"

interface AuthCallbackProps {}

const AuthCallback = ({}: AuthCallbackProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        router.push(origin ? `/${origin}` : "/dashboard")
      }
    },
    onError: (err) => {
      console.error(err)
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in")
      }
    },
    retry: true,
    retryDelay: 500
  })

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin w-8 h-8 text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account ...</h3>
        <p>You will be rediected automatically.</p>
      </div>
    </div>
  )
}

export default AuthCallback
