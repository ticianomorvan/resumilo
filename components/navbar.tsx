import { client } from 'lib/pocketbase';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { container, name } from 'styles/components/navbar.css';
import { redirect } from 'lib/utils';
import useUser from 'hooks/useUser';
import Button from './button';

function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  const signOutAction = async () => {
    client.authStore.clear();
    toast.success('Cerraste sesión correctamente.');
    setTimeout(() => redirect({
      router, destination: '/login',
    }));
  };

  return (
    <nav className={container}>
      <p className={name}>Resumilo.</p>
      {user ? (
        <Button variant="caution" onClick={signOutAction}>
          Cerrar sesión
        </Button>
      ) : (
        <Button variant="ghost" onClick={() => router.push('/login')}>
          Iniciar sesión
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
