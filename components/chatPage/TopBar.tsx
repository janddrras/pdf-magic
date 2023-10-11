import { ChevronDown, ChevronUp, RotateCw, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import PdfFullscreen from "./PdfFullscreen"

interface TopBarProps {
  numPages: number | undefined
  currPage: number
  setCurrPage: (page: any) => void
  scale: number
  setScale: (scale: any) => void
  setRotation: (rotation: any) => void
  fileUrl: string
}

const TopBar = ({ numPages, currPage, setCurrPage, scale, setScale, setRotation, fileUrl }: TopBarProps) => {
  const CustomPageValidator = z.object({
    page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!)
  })

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TCustomPageValidator>({ defaultValues: { page: "1" }, resolver: zodResolver(CustomPageValidator) })

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue("page", String(page))
  }

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Button
          aria-label="Previous page"
          disabled={numPages === undefined || currPage === 1}
          variant="ghost"
          onClick={() => {
            setCurrPage((prev: number) => (prev - 1 > 1 ? prev - 1 : 1))
            setValue("page", String(currPage - 1))
          }}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1.5">
          <Input
            {...register("page")}
            className={cn("w-12 h-8", errors.page && "focus-visible:ring-red-500")}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(handlePageSubmit)()
            }}
          />
          <p className="text-zinc-700 text-sm space-x-1">
            <span>/</span>
            <span>{numPages ?? "x"}</span>
          </p>
        </div>

        <Button
          disabled={numPages === undefined || currPage === numPages}
          aria-label="Next page"
          variant="ghost"
          onClick={() => {
            setCurrPage((prev: number) => (prev + 1 > 1 ? numPages! : prev + 1))
            setValue("page", String(currPage + 1))
          }}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-1.5" aria-label="zoom" variant="ghost">
              <Search className="h-4 w-4" />
              {scale * 100}%
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setScale(2.5)}>250%</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => setRotation((prev: number) => prev + 90)} variant="ghost" aria-label="rotate 90 degrees">
          <RotateCw className="h-4 w-4" />
        </Button>

        <PdfFullscreen fileUrl={fileUrl} />
      </div>
    </>
  )
}

export default TopBar
