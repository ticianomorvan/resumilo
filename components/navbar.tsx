import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../hooks/useUser";

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
    <nav className="p-4 w-full flex justify-between items-center">
      <p className="text-2xl">Resumilo.</p>
      {user ? (
        <button className="button warning" onClick={signOutAction}>
          Cerrar sesión
        </button>
      ) : (
        <Link href="/login">
          <button className="button ghost">Iniciar sesión</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
