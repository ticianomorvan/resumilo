// Types
import { Resumen } from "../types/resumen";
import { FirebaseError } from "firebase/app";

// Firebase
import { auth, firestore, googleProvider, storage } from "./firebase";
import { getDocs, collection, setDoc, doc, getDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import { ref } from "firebase/storage";
import { User } from "../types/user";

// These are some functions used across the application to communicate
// with Firebase's backend. They implicitly use the defined constants for every
// Firebase feature instead of passing them as parameters, because it makes them
// easier to use and removes the need to import the previously mentioned
// constants in the different parts of the application.

const formatFirebaseError = (error: unknown) => {
  const { code, name, message } = error as FirebaseError;
  return `${name.toUpperCase()} (${code}): ${message}`
}

// Cloud Firestore

/** @returns All "resumenes" from Firebase's Cloud Firestore. */
export const getAllResumenes = async () => {
  try {
    const query: Resumen[] = await getDocs(collection(firestore, "resumenes"))
      .then((snapshot) => snapshot.docs.map((doc) => doc.data() as Resumen))

    return query
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const createResumenDoc = async ({ title, description, topic, date, author_id, file_reference }: Resumen) => {
  try {
    return await setDoc(doc(collection(firestore, "resumenes")), {
      title,
      description,
      topic,
      date,
      author_id,
      file_reference,
    })
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

// When we create a user, we don't expect them to have any summaries created,
// so we don't pass any parameter to it. We'll later update the user when they
// create a summary.
export const createUserDoc = async (uid: string, { name, avatar, email, resumenes = [] }: User) => {
  try {
    return await setDoc(doc(firestore, "usuarios", uid), {
      name,
      avatar,
      email,
      resumenes
    })
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const isAlreadyCreated = async (uid: string) => {
  try {
    const query = await getDoc(doc(firestore, "usuarios", uid))
    return query.exists()
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const getUserDoc = async (uid: string) => {
  try {
    const query = await getDoc(doc(firestore, "usuarios", uid))
    return query.data() as User
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

// Authentication

export const googleSignIn = () => {
  try {
    return signInWithPopup(auth, googleProvider)
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const closeSession = () => {
  try {
    return signOut(auth)
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

// Storage

export const createResumenRef = (document: File) => {
  try {
    return ref(storage, `resumenes/${document.name}`)
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}