import { cn } from "@/lib/utils"
import "./globals.css"
import "react-loading-skeleton/dist/skeleton.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/layout/Navbar"
import Providers from "@/components/Providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Magic pdf",
  description: "Create descritions for your pdfs"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body className={cn("min-h-screen font-sans antialiased grainy", inter.className)}>
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  )
}
