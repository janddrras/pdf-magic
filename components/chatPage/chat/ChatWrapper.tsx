"use client"

import { trpc } from "@/app/_trpc/client"
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import Loading from "./status/Loading"
import Processing from "./status/Processing"
import Failed from "./status/Failed"
import ChatContextProvider from "./ChatContext"

interface ChatWrapperProps {
  isSubscribed?: boolean
  fileId: string
}

const ChatWrapper = ({ isSubscribed, fileId }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    { fileId },
    {
      refetchInterval: (data: any) => (data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500)
    }
  )

  if (isLoading) return <Loading />

  if (data?.status === "PROCESSING") return <Processing />

  if (data?.status === "FAILED") return <Failed isSubscribed={isSubscribed} />

  return (
    <ChatContextProvider fileId={fileId}>
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 justify-between flex flex-col mb-28">
          <Messages fileId={fileId} />
        </div>

        <ChatInput />
      </div>
    </ChatContextProvider>
  )
}

export default ChatWrapper
