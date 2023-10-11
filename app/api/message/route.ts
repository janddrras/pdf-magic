import useAuth from "@/hooks/useAuth"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const user = useAuth()
  const { id: userId } = user
  if (!userId) return new Response("Unauthorized", { status: 401 })
}
