import { client } from "lib/pocketbase";
import { useRouter } from "next/router";
import { useUser } from "../hooks/useUser";
import { navbar } from "../styles/components/navbar.css";
import { toast } from "react-hot-toast";
import Button from "./button";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const signOutAction = async () => {
    client.authStore.clear();
    toast.success("Cerraste sesión correctamente.");
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <nav className={navbar.container}>
      <p className={navbar.name}>Resumilo.</p>
      {user ? (
        <Button variant="caution" onClick={signOutAction}>
          Cerrar sesión
        </Button>
      ) : (
        <Button variant="ghost" onClick={() => router.push("/login")}>
          Iniciar sesión
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
