"use client"

import { trpc } from "@/app/_trpc/client"
import UploadButton from "./UploadButton"
import { Ghost } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import FileComponent from "./FileComponent"
import { useState } from "react"

const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)

  const utils = trpc.useContext()
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => utils.getUserFiles.invalidate(),
    onMutate: ({ id }) => setCurrentlyDeletingFile(id),
    onSettled: () => setCurrentlyDeletingFile(null)
  })

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>
        <UploadButton />
      </div>

      {files && files.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((file) => (
              <FileComponent file={file} key={file.id} deleteFile={deleteFile} currentlyDeletingFile={currentlyDeletingFile} />
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard
