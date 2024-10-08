"use client"

import { trpc } from "@/app/_trpc/client"
import { useToast } from "@/components/ui/use-toast"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { useState } from "react"

// interface useUploadHookProps {}

const useUploadHook = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const router = useRouter()

  const { startUpload } = useUploadThing(isSubscribed ? "proPlanUploader" : "freePlanUploader")

  const { toast } = useToast()

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`)
    },
    retry: true,
    retryDelay: 500
  })

  const dropAction = async (acceptedFiles: File[]) => {
    setIsUploading(true)
    const progressInterval = startSimulatedProgress()

    // TODO: Upload file to server
    const res = await startUpload(acceptedFiles)

    if (!Array.isArray(res)) {
      return toast({ title: "Something went wrong", description: "Please try again", variant: "destructive" })
    }

    const [fileResponse] = res

    const key = fileResponse?.key

    if (!key) {
      return toast({ title: "Something went wrong", description: "Please try again", variant: "destructive" })
    }

    clearInterval(progressInterval)
    setUploadProgress(100)

    startPolling({ key })
  }

  // Fake progress bar
  const startSimulatedProgress = () => {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 500)

    return interval
  }
  return { isUploading, uploadProgress, dropAction }
}

export default useUploadHook
