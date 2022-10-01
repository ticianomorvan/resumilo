import { onAuthStateChanged, User, } from "firebase/auth"
import { useEffect, useState } from "react"
import { firebaseAuth } from "../lib/firebase"

export const useUser = () => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const auth = firebaseAuth
    onAuthStateChanged(auth, async (user) => user ? setUser(user) : setUser(undefined))
  }, [])

  return { user }
}