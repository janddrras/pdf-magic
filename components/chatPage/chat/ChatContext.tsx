"use client"

import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import { type ChangeEvent, createContext, useState } from "react"

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
  const toast = useToast()

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
    }
  })

  const addMessage = () => sendMessage({ message })

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)

  return <ChatContext.Provider value={{ addMessage, handleInputChange, message, isLoading }}>{children}</ChatContext.Provider>
}

export default ChatContextProvider
