import Link from "next/link";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { closeSession } from "../lib/utils";

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const signOutAction = () => {
    closeSession()
      .then(() => {
        toast({
          title: "Cerraste sesión correctamente.",
          status: "info",
          variant: "subtle",
          duration: 1000,
        });
      })
      .finally(() => {
        if (router.pathname.endsWith("/")) return router.reload();
        return router.push("/");
      });
  };

  return (
    <HStack position="fixed" top={0} padding={4}>
      <Text fontSize="2xl">Resumilo</Text>
      {user ? (
        <Button colorScheme="red" onClick={signOutAction}>
          Cerrar sesión
        </Button>
      ) : (
        <Link href="/login">
          <Button>Iniciar sesión</Button>
        </Link>
      )}
    </HStack>
  );
};

export default Navbar;
