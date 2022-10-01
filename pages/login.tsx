import {
  GoogleAuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { firebaseAuth } from "../lib/firebase";
import { toast } from "react-hot-toast";
import Button from "../components/button";

const LogIn: NextPage = () => {
  const router = useRouter();

  const createUserAction = async () => {
    const { isAlreadyCreated, createUserDoc } = await import("../lib/firebase");

    const auth = firebaseAuth;
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(
      auth,
      provider,
      browserPopupRedirectResolver
    );

    return toast(`Iniciaste sesión como ${result.user.displayName}`);

    /*
    googleSignIn()
      .then(async ({ user }) => {
        const isInDatabase = await isAlreadyCreated(user.uid);

        if (isInDatabase)
          return router.back(); // Log-in without creating a new user.
        else {
          createUserDoc(user.uid, {
            id: user.uid,
            name: user.displayName ?? "Usuario anónimo",
            avatar: user.photoURL ?? "https://ui-avatars.com/api/?name=X",
            email: user.email ?? "",
            summaries: [],
          })
            .then(() => {
              toast({
                title: "¡Iniciaste sesión correctamente!",
                description: "Ahora puedes usar Resumilo :)",
                status: "success",
                duration: 3000,
                onCloseComplete: () => router.back(),
              });
            })
            .catch((error) => toast(errorToast(error)));
        }
      })
      .catch((error) => toast(errorToast(error)));
      */
  };

  return <Button onClick={createUserAction}>Log In</Button>;
};

export default LogIn;
