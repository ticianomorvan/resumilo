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

    const { user } = await signInWithPopup(
      auth,
      provider,
      browserPopupRedirectResolver
    );

    if (await isAlreadyCreated(user.uid)) {
      router.back();
    } else {
      toast.promise(
        createUserDoc(user.uid, {
          id: user.uid,
          name: user.displayName ?? "Anónimo",
          avatar:
            user.photoURL ??
            `https://ui-avatars.com/api/?name=${
              user.displayName
                ? encodeURIComponent(user.displayName)
                : "John-Doe"
            }`,
          email: user.email ?? "johndoe@gmail.com",
          summaries: [],
        }),
        {
          loading: "Creándote un usuario...",
          success: "¡Usuario creado con éxito! Ahora puedes usar Resumilo",
          error: "Hubo un error al crear tu usuario.",
        }
      );
    }
  };

  return <Button onClick={createUserAction}>Log In</Button>;
};

export default LogIn;
