import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"

interface StepProps {
  id: number
  title: string
  content: string
  href?: Url
  link?: string
}

const Step = ({ id, title, content, href, link }: StepProps) => {
  return (
    <li className="md:flex-1">
      <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
        <span className="text-sm font-medium text-blue-600">Step {id}</span>
        <span className="text-xl font-semibold">{title}</span>
        <span className="mt-2 text-zinc-700">
          {content}{" "}
          {href && (
            <Link href={href} className="text-blue-700 underline underline-offset-2">
              {link}.
            </Link>
          )}
        </span>
      </div>
    </li>
  )
}

export default Step
