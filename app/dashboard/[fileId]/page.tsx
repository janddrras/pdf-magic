import ChatWrapper from "@/components/chatPage/chat/ChatWrapper"
import PdfRenderer from "@/components/chatPage/pdf/PdfRenderer"
import { db } from "@/db"
import useAuth from "@/hooks/useAuth"
import { notFound, redirect } from "next/navigation"

interface ProductPageProps {
  params: {
    fileId: string
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { fileId } = params

  const user = useAuth()
  if (!user || !user.id) redirect(`/auth-callback?origin=/dashboard/${fileId}`)

  const file = await db.file.findUnique({ where: { id: fileId, userId: user.id } })
  if (!file) notFound()

  // temp
  const isSubscribed = true

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>

        {/* Right sidebar & chat */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper isSubscribed={isSubscribed} fileId={file.id} />
        </div>
      </div>
    </div>
  )
}

export default ProductPage
