"use client"

import { trpc } from "@/app/_trpc/client"
import { useToast } from "@/components/ui/use-toast"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
import { useMutation } from "@tanstack/react-query"
import { type ChangeEvent, createContext, useState, useRef } from "react"

type ContextType = {
  addMessage: () => void
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  message: string
  isLoading: boolean
}

export const ChatContext = createContext<ContextType>({
  addMessage: () => {},
  handleInputChange: () => {},
  message: "",
  isLoading: false
})

interface ChatContextProviderProps {
  fileId: string
  children: React.ReactNode
}

const ChatContextProvider = ({ children, fileId }: ChatContextProviderProps) => {
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const utils = trpc.useContext()

  const backupMessage = useRef<string>("")

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          message,
          fileId
        })
      })
      if (!response.ok) throw new Error("Something went wrong")

      return response.body
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message
      setMessage("")

      await utils.getFileMessages.cancel()

      const previousMessages = utils.getFileMessages.getInfiniteData()
      utils.getFileMessages.setInfiniteData({ fileId, limit: INFINITE_QUERY_LIMIT }, (old) => {
        if (!old) return { pages: [], pageParams: [] }
        let newPages = [...old.pages]
        let latestPage = newPages[0]!
        latestPage.messages = [
          { id: crypto.randomUUID(), isUserMessage: true, text: message, createdAt: new Date().toISOString() },
          ...latestPage.messages
        ]
        newPages[0] = latestPage

        return { ...old, pages: newPages }
      }),
        setIsLoading(true)
      return { previousMessages: previousMessages?.pages.flatMap((page) => page.messages) ?? [] }
    },
    onError: (_, __, context) => {
      setMessage(backupMessage.current)
      utils.getFileMessages.setData({ fileId }, { messages: context?.previousMessages ?? [] })
    },
    onSettled: async () => {
      setIsLoading(false)
      await utils.getFileMessages.invalidate({ fileId })
    },
    onSuccess: async (stream) => {
      setIsLoading(false)
      if (!stream) return toast({ title: "Something went wrong", description: "Please refresh this page", variant: "destructive" })

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false

      // accumulated response
      let accResponse = ""

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)

        accResponse += chunkValue

        // append chunk to the actual message
        utils.getFileMessages.setInfiniteData({ fileId, limit: INFINITE_QUERY_LIMIT }, (old) => {
          if (!old) return { pages: [], pageParams: [] }

          let isAiResponseCreated = old.pages.some((page) => page.messages.some((message) => message.id === "ai-response"))

          let updatedPages = old.pages.map((page) => {
            if (page === old.pages[0]) {
              let updatedMessages

              if (!isAiResponseCreated) {
                updatedMessages = [
                  {
                    createdAt: new Date().toISOString(),
                    id: "ai-response",
                    text: accResponse,
                    isUserMessage: false
                  },
                  ...page.messages
                ]
              } else {
                updatedMessages = page.messages.map((message) => {
                  if (message.id === "ai-response") {
                    return { ...message, text: accResponse }
                  }
                  return message
                })
              }

              return { ...page, messages: updatedMessages }
            }

            return page
          })

          return { ...old, pages: updatedPages }
        })
      }
    }
  })

  const addMessage = () => sendMessage({ message })

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)

  return <ChatContext.Provider value={{ addMessage, handleInputChange, message, isLoading }}>{children}</ChatContext.Provider>
}

export default ChatContextProvider
