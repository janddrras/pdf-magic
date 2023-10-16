import { type PricingFeatureType } from "@/lib/pricingItems"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { Minus, Check, HelpCircle } from "lucide-react"

const Feature = ({ text, footnote, negative }: PricingFeatureType) => {
  return (
    <li key={text} className="flex space-x-5">
      <div className="flex-shrink-0">
        {negative ? <Minus className="h-6 w-6 text-gray-300" /> : <Check className="h-6 w-6 text-blue-500" />}
      </div>
      {footnote ? (
        <div className="flex items-center space-x-1">
          <p
            className={cn("text-gray-600", {
              "text-gray-400": negative
            })}
          >
            {text}
          </p>
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="cursor-default ml-1.5">
              <HelpCircle className="h-4 w-4 text-zinc-500" />
            </TooltipTrigger>
            <TooltipContent className="w-80 p-2">{footnote}</TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <p
          className={cn("text-gray-600", {
            "text-gray-400": negative
          })}
        >
          {text}
        </p>
      )}
    </li>
  )
}

export default Feature
