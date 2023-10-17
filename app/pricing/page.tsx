import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import PricingItem from "@/components/pricing/PricingItem"
import { TooltipProvider } from "@/components/ui/tooltip"
import useAuth from "@/hooks/useAuth"
import { pricingItems } from "@/lib/pricingItems"

const Pricing = () => {
  const user = useAuth()

  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            Whether you&apos;re just trying out our service or need more, we&apos;ve got you covered.
          </p>
        </div>

        <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <TooltipProvider>
            {pricingItems.map((item) => (
              <PricingItem key={item.plan} {...item} user={user} />
            ))}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Pricing
