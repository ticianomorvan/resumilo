import { Button, HStack, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../lib/auth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <HStack position="fixed" top={0} padding={4}>
      <Text fontSize="2xl">Resumilo</Text>
      {user ? (
        <Button colorScheme="red" onClick={() => signOut(auth)}>
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
