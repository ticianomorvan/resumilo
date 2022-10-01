import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../hooks/useUser";
import { navbar } from "../styles/components.css";
import Button from "./button";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const signOutAction = async () => {
    const { closeSession } = await import("../lib/firebase");

    closeSession()
      .then(() => {
        alert("cerraste sesión");
      })
      .finally(() => {
        if (router.pathname.endsWith("/")) return router.reload();
        return router.push("/");
      });
  };

  return (
    <nav className={navbar.container}>
      <p className={navbar.name}>Resumilo.</p>
      {user ? (
        <Button variant="caution" onClick={signOutAction}>
          Cerrar sesión
        </Button>
      ) : (
        <Link href="/login">
          <Button variant="ghost">Iniciar sesión</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
