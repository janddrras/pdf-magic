"use client"

import { PLANS } from "@/config/stripe"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { ArrowRight, HelpCircle } from "lucide-react"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { type PricingItemType } from "@/lib/pricingItems"
import Feature from "./Feature"
import { type KindeUser } from "@kinde-oss/kinde-auth-nextjs/server"
import UpgradeButton from "./UpgradeButton"

interface PricingItemProps extends PricingItemType {
  user: KindeUser
}

const PricingItem = ({ plan, tagline, quota, features, user }: PricingItemProps) => {
  const price = PLANS.find((p) => p.slug === plan.toLowerCase())?.price.amount || 0

  return (
    <div
      className={cn("relative rounded-2xl bg-white shadow-lg", {
        "border-2 border-blue-600 shadow-blue-200": plan === "Pro",
        "border border-gray-200": plan !== "Pro"
      })}
    >
      {plan === "Pro" && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
          Upgrade now
        </div>
      )}

      <div className="p-5">
        <h3 className="my-3 text-center font-display text-3xl font-bold">{plan}</h3>
        <p className="text-gray-500">{tagline}</p>
        <p className="my-5 font-display text-6xl font-semibold">${price}</p>
        <p className="text-gray-500">per month</p>
      </div>

      <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-1">
          <p>{quota.toLocaleString()} PDFs/mo included</p>

          <Tooltip delayDuration={300}>
            <TooltipTrigger className="cursor-default ml-1.5">
              <HelpCircle className="h-4 w-4 text-zinc-500" />
            </TooltipTrigger>
            <TooltipContent className="w-80 p-2 bg-white border rounded-lg shadow-md">
              How many PDFs you can upload per month.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <ul className="my-10 space-y-5 px-8">
        {features.map(({ text, footnote, negative }) => (
          <Feature key={text} text={text} footnote={footnote} negative={negative} />
        ))}
      </ul>
      <div className="border-t border-gray-200" />
      <div className="p-5">
        {plan === "Free" ? (
          <Link
            href={user ? "/dashboard" : "/sign-in"}
            className={buttonVariants({
              className: "w-full",
              variant: "secondary"
            })}
          >
            {user ? "Continue" : "Sign up"}
            <ArrowRight className="h-5 w-5 ml-1.5" />
          </Link>
        ) : user ? (
          <UpgradeButton />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({
              className: "w-full"
            })}
          >
            {user ? "Upgrade now" : "Sign up"}
            <ArrowRight className="h-5 w-5 ml-1.5" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default PricingItem
