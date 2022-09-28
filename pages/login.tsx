import { Button, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { errorToast } from "../lib/utils";

const LogIn: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const createUserAction = async () => {
    const { googleSignIn, isAlreadyCreated, createUserDoc } = await import(
      "../lib/firebase"
    );

    googleSignIn()
      .then(async ({ user }) => {
        const isInDatabase = await isAlreadyCreated(user.uid);

        if (isInDatabase)
          return router.back(); // Log-in without creating a new user.
        else {
          createUserDoc(user.uid, {
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
              });
              setTimeout(() => router.back(), 3000);
            })
            .catch((error) => toast(errorToast(error)));
        }
      })
      .catch((error) => toast(errorToast(error)));
  };

  return <Button onClick={createUserAction}>Log In</Button>;
};

export default LogIn;
