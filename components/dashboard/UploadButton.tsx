"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import UploadDropzone from "./UploadDropzone"

interface UploadButtonProps {}

const UploadButton = ({}: UploadButtonProps) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) setOpen(v)
      }}
    >
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
