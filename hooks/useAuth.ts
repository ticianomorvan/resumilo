import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../lib/firebase"

export const useAuth = () => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) return setUser(currentUser);
      else if (window.location.pathname !== "/") return window.location.replace('/login')
    })
  }, [])

  useEffect(() => {
    if (user && window.location.pathname.includes('login')) return window.location.replace('/')
  }, [user])

  return { user }
}