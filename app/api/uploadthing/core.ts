import { db } from "@/db"
import useAuth from "@/hooks/useAuth"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = useAuth()
      if (!user || !user.id) throw new Error("NOT_AUTHENTICATED")

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url)
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          userId: metadata.userId
        }
      })
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
