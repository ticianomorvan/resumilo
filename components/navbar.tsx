import { useRouter } from 'next/router';
import { actions, container, name } from 'styles/components/navbar.css';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import Button from './button';
import AvatarComponent from './avatar';

function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <nav className={container}>
      <p className={name}>Resumilo.</p>

      <div>
        <Link href="/resumenes">Resúmenes</Link>
        <Link href="/create">Crear</Link>
      </div>

      {user ? (
        <div className={actions}>
          <AvatarComponent />
        </div>
      ) : (
        <Button variant="ghost" onClick={() => router.push('/login')}>
          Iniciar sesión
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
