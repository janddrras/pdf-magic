import { PLANS } from "@/config/stripe"
import { Type } from "lucide-react"

export const pricingItems = [
  {
    plan: "Free",
    tagline: "For small side projects.",
    quota: 10,
    features: [
      {
        text: "5 pages per PDF",
        footnote: "The maximum amount of pages per PDF-file."
      },
      {
        text: "4MB file size limit",
        footnote: "The maximum file size of a single PDF file."
      },
      {
        text: "Mobile-friendly interface"
      },
      {
        text: "Higher-quality responses",
        footnote: "Better algorithmic responses for enhanced content quality",
        negative: true
      },
      {
        text: "Priority support",
        negative: true
      }
    ]
  },
  {
    plan: "Pro",
    tagline: "For larger projects with higher needs.",
    quota: PLANS.find((p) => p.slug === "pro")!.quota,
    features: [
      {
        text: "25 pages per PDF",
        footnote: "The maximum amount of pages per PDF-file."
      },
      {
        text: "16MB file size limit",
        footnote: "The maximum file size of a single PDF file."
      },
      {
        text: "Mobile-friendly interface"
      },
      {
        text: "Higher-quality responses",
        footnote: "Better algorithmic responses for enhanced content quality"
      },
      {
        text: "Priority support"
      }
    ]
  }
]

export type PricingItemType = (typeof pricingItems)[0]
export type PricingFeatureType = PricingItemType["features"][0]
