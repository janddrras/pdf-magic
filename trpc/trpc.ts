import useAuth from "@/hooks/useAuth"
import { TRPCError, initTRPC } from "@trpc/server"
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

const middleware = t.middleware

const isAuth = middleware(async (options) => {
  const user = useAuth()

  if (!user || !user.id) throw new TRPCError({ code: "UNAUTHORIZED" })

  return options.next({
    ctx: {
      userId: user.id,
      user
    }
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
