import Link from "next/link"
import { ArrowRight } from "lucide-react"

import steps from "@/lib/steps.json"
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { buttonVariants } from "@/components/ui/button"
import LandingImage from "@/components/landingPage/LandingImage"
import Spot from "@/components/landingPage/Spot"
import Step from "@/components/landingPage/Step"

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">Magic pdf is now public!</p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chat with your <span className="text-blue-600">documents</span> in seconds
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Quill allows you to have conversations with any PDF document. Simply upload your file and start asking questions right away.
        </p>

        <Link className={buttonVariants({ size: "lg", className: "mt-5" })} href="/dashboard" target="_blank">
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* ------------value proposition --------------------- */}

      <section id="value-proposition">
        <div className="relative isolate">
          <Spot />

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <LandingImage src="/dashboard-preview.jpg" alt="product preview" width={1364} height={866} />
              </div>
            </div>
          </div>

          <Spot modifiers={["13rem", "36rem"]} />
        </div>
      </section>

      {/* ------------features --------------------- */}

      <section id="features">
        <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">Start chatting in minutes</h2>
              <p className="mt-4 text-lg text-gray-600">Chatting to your PDF files has never been easier than with Quill.</p>
            </div>
          </div>

          {/* steps */}
          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            {steps.map((step) => (
              <Step key={step.id} {...step} />
            ))}
          </ol>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <LandingImage src="/file-upload-preview.jpg" alt="uploading preview" width={1419} height={732} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
