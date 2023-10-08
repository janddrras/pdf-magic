import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { privateProcedure, publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server"
import { db } from "@/db"
import { z } from "zod"

export const appRouter = router({
  // Updating the user in database
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" })

    const dbUser = await db.user.findFirst({ where: { id: { equals: user.id } } })

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email
        }
      })
    }

    return { success: true }
  }),
  // Fetch all files for the current user
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const files = await db.file.findMany({ where: { userId: { equals: ctx.userId } } })

    return files
  }),
  // Delete file by id
  deleteFile: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const { userId } = ctx
    const file = await db.file.findFirst({ where: { id: input.id, userId } })

    if (!file) throw new TRPCError({ code: "NOT_FOUND" })

    await db.file.delete({ where: { id: input.id } })

    return file
  })
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
