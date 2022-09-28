import { FirebaseError, FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Summary } from "../types/summary";
import { User } from "../types/user";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
}

export const firebase = getApps().length <= 0 ? initializeApp(firebaseConfig) : getApp()

export const getCurrentApp = async () => getApp()

export const getCurrentFirestore = async () => getFirestore()

export const getCurrentStorage = async () => getStorage()

// Utils

export const formatFirebaseError = (error: unknown) => {
  const { code, name, message } = error as FirebaseError;
  return `${name.toUpperCase()} (${code}): ${message}`
}

// Cloud Firestore

/** @returns All "summaries" from Firebase's Cloud Firestore. */
export const getAllSummaries = async () => {
  try {
    const firestore = await getCurrentFirestore()
    const query: Summary[] = await getDocs(collection(firestore, "summaries"))
      .then((snapshot) => snapshot.docs.map((doc) => doc.data() as Summary))

    return query
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const getSummaryById = async (id: string) => {
  try {
    const firestore = await getCurrentFirestore()
    const ref = doc(firestore, "summaries", id)
    const summary = await getDoc(ref)
    return summary.data() as Summary
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const createSummaryDoc = async (
  { id, title, description, topic, date, author_id, file_reference }: Summary
) => {
  try {
    const firestore = await getCurrentFirestore()

    return await setDoc(doc(collection(firestore, "summaries"), id), {
      id, title, description, topic, date, author_id, file_reference,
    })
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

// This solution is temporal until we can include something like Algolia or Elasticsearch.
export const filterSummaries = async (search: string) => {
  try {
    const firestore = await getCurrentFirestore()
    const querySnapshot = query(collection(firestore, "summaries"))
    const documents = await getDocs(querySnapshot)
    let matchingDocuments: Summary[] = []

    for (let i = 0; i < documents.size; i++) {
      const data = documents.docs[i].data() as Summary
      if (
        (data.title.toLowerCase().includes(search)) ||
        (data.description.toLowerCase().includes(search)) ||
        (data.topic.toLowerCase().includes(search))
      ) {
        matchingDocuments = [...matchingDocuments, data]
      }
    }

    return matchingDocuments
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

// When we create a user, we don't expect them to have any summaries created,
// so we don't pass any parameter to it. We'll later update the user when they
// create a summary.
export const createUserDoc = async (uid: string, { id, name, avatar, email, summaries = [] }: User) => {
  try {
    const firestore = await getCurrentFirestore()
    return await setDoc(doc(firestore, "users", uid), {
      id,
      name,
      avatar,
      email,
      summaries
    })
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const isAlreadyCreated = async (uid: string) => {
  try {
    const firestore = await getCurrentFirestore()
    const query = await getDoc(doc(firestore, "users", uid))
    return query.exists()
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const getUserDoc = async (uid: string) => {
  try {
    const firestore = await getCurrentFirestore()
    const query = await getDoc(doc(firestore, "users", uid))
    return query.data() as User
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const getUserSummaries = async (uid: string) => {
  try {
    const firestore = await getCurrentFirestore()
    const querySnapshot = query(collection(firestore, "summaries"), where("author_uid", "==", uid));
    return getDocs(querySnapshot)
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

// Authentication

export const googleSignIn = async () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const closeSession = async () => {
  try {
    const auth = getAuth()
    return signOut(auth)
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

// Storage

export const createSummaryRef = async (document: File) => {
  try {
    const storage = await getCurrentStorage();
    return ref(storage, `summaries/${document.name}`)
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}

export const getSummaryDownloadUrl = async (fileName: string) => {
  try {
    const storage = await getCurrentStorage();
    return await getDownloadURL(ref(storage, `summaries/${fileName}`))
  } catch (error: unknown) {
    throw new Error(formatFirebaseError(error))
  }
}