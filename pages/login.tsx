import { Button, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import BaseLayout from "../components/layouts/BaseLayout";
import { createUserDoc, googleSignIn, isAlreadyCreated } from "../lib/utils";

const LogIn: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const createUserAction = async () => {
    googleSignIn()
      .then(async ({ user }) => {
        const isInDatabase = await isAlreadyCreated(user.uid);

        if (isInDatabase) return router.back();
        else {
          createUserDoc(user.uid, {
            name: user.displayName ?? "Usuario anónimo",
            avatar: user.photoURL ?? "https://ui-avatars.com/api/?name=X",
            email: user.email ?? "",
            resumenes: [],
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
            .catch((error) =>
              toast({
                title: "Hubo un problema",
                description: error,
                status: "error",
                isClosable: true,
              })
            );
        }
      })
      .catch((error) =>
        toast({
          title: "Hubo un problema",
          description: error,
          status: "error",
          isClosable: true,
        })
      );
  };

  return (
    <BaseLayout title="Iniciar sesión | Resumilo">
      <Button onClick={createUserAction}>Log In</Button>;
    </BaseLayout>
  );
};

export default LogIn;
