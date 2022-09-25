import { firebase } from "./firebase";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

export const auth = getAuth(firebase);
export const provider = new GoogleAuthProvider()