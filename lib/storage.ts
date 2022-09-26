import { firebase } from "./firebase";
import { getStorage } from "firebase/storage"

export const storage = getStorage(firebase)