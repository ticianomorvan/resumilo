import { firebase } from "./firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore"

export const firestore = getFirestore(firebase)

export const getAllResumenes = () => getDocs(collection(firestore, 'resumenes'));