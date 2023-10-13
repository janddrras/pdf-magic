import { db } from "@/db"
import useAuth from "@/hooks/useAuth"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { pinecone } from "@/lib/pinecone"

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

      try {
        const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)
        const blob = await response.blob()

        const loader = new PDFLoader(blob)

        const pageLevelDocs = await loader.load()
        const pageesAmt = pageLevelDocs.length

        // vectorize and index the document

        const pineconeIndex = pinecone.Index("magic-pdf")
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY!
        })

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          pineconeIndex
          // namespace: createdFile.id
        })

        await db.file.update({
          data: {
            status: "SUCCESS"
          },
          where: {
            id: createdFile.id
          }
        })
      } catch (error) {
        await db.file.update({
          data: {
            status: "FAILED"
          },
          where: { id: createdFile.id }
        })
        console.log("error", error)
      }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
