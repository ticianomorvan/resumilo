import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../lib/auth"

export const useAuth = () => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else if (window.location.pathname !== "/") window.location.replace('/login')
    })
  }, [])

  return { user }
}