import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { firebase } from "../lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { formatFirebaseError } from "../lib/firebase";

interface Context {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined;
  loadingUser: boolean;
}

export const UserContext = createContext<Context>({
  user: undefined,
  setUser: undefined,
  loadingUser: true,
});

interface Props {
  children: ReactNode;
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsuscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
        } else setUser(undefined);
      } catch (error: unknown) {
        throw new Error(formatFirebaseError(error));
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsuscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
