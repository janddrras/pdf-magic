"use client"

import { Menu } from "lucide-react"
import Link from "next/link"

import { useState } from "react"
import links from "@/lib/links.json"

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <div className="sm:hidden">
      <Menu onClick={() => setOpen((prev) => !prev)} className="relative z-50 h-5 w-5 text-zinc-700 cursor-pointer" />

      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-6 px-10 pt-20 pb-8">
            {!isAuth
              ? links
                  .filter((link) => !link.isAuth)
                  .map((link) => (
                    <li key={link.id}>
                      <Link onClick={() => setOpen(false)} className="flex items-center w-full font-semibold" href={link.link}>
                        {link.name}
                      </Link>
                    </li>
                  ))
              : links
                  .filter((link) => link.isAuth)
                  .map((link) => (
                    <li key={link.id}>
                      <Link onClick={() => setOpen(false)} className="flex items-center w-full font-semibold" href={link.link}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
