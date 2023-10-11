import { Loader2 } from "lucide-react"
import ChatInput from "../ChatInput"

const Loading = () => {
  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <h3 className="font-semibold text-xl">Loading...</h3>
          <p className="text-zinc-500 text-sm">We&apos;re preparing your PDF.</p>
        </div>
      </div>

      <ChatInput isDisabled />
    </div>
  )
}

export default Loading
