import Dashboard from "@/components/dashboard/Dashboard"
import { db } from "@/db"
import useAuth from "@/hooks/useAuth"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
  const user = useAuth()

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard")

  const dbUser = await db.user.findFirst({ where: { id: user.id } })

  if (!dbUser) redirect("/auth-callback?origin=dashboard")

  const subscriptionPlan = await getUserSubscriptionPlan()

  return <Dashboard subscriptionPlan={subscriptionPlan} />
}

export default DashboardPage
