import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const useAuth = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()
  return user
}

export default useAuth
