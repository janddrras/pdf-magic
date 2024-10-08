import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "../ui/button"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight } from "lucide-react"
import useAuth from "@/hooks/useAuth"
import UserAccountNav from "./UserAccountNav"
import MobileNav from "./MobileNav"

const Navbar = () => {
  const user = useAuth()

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Magic Pdf</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link href="/pricing" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  <span>Pricing</span>
                </Link>
                <LoginLink>Sign in</LoginLink>
                <RegisterLink className={buttonVariants({ size: "sm" })}>
                  Get started <ArrowRight className="ml-1.5 w-3 h-3" />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  <span>Dashboard</span>
                </Link>
                <UserAccountNav
                  name={!user.given_name || !user.family_name ? "Your Account" : `${user.given_name} ${user.family_name}`}
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
