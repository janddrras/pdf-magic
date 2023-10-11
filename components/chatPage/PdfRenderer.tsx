"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"
import { useResizeDetector } from "react-resize-detector"
import { Loader2 } from "lucide-react"

import { toast } from "../ui/use-toast"
import TopBar from "./TopBar"
import { cn } from "@/lib/utils"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)

  const isLoading = renderedScale !== scale

  const { width, ref } = useResizeDetector()

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <TopBar
          numPages={numPages}
          setCurrPage={setCurrPage}
          currPage={currPage}
          setScale={setScale}
          setRotation={setRotation}
          scale={scale}
          fileUrl={url}
        />
      </div>

      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              file={url}
              className="max-h-full"
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading PDF",
                  description: "Please try again later",
                  variant: "destructive"
                })
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {isLoading && renderedScale ? (
                <Page width={width ? width : 1} pageNumber={currPage} scale={scale} rotate={rotation} key={"@" + renderedScale} />
              ) : null}

              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer
