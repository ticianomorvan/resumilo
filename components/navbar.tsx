import { useRouter } from 'next/router';
import {
  actions, container, dropdown,
} from 'styles/components/navbar.css';
import useUser from 'hooks/useUser';

// Components
import Link from 'next/link';
import {
  Root, Trigger, Portal, Content, Item,
} from '@radix-ui/react-dropdown-menu';
import { FaCaretDown, FaFileAlt, FaPlusCircle } from 'react-icons/fa';
import Button from './button';
import AvatarComponent from './avatar';

function DropdownLogo() {
  return (
    <Root>
      <Trigger asChild>
        <span className={dropdown.trigger}>
          <p>Resumilo</p>
          <FaCaretDown className={dropdown.caret} />
        </span>
      </Trigger>
      <Portal>
        <Content className={dropdown.content}>
          <Item>
            <Link href="/resumenes">
              <span className={dropdown.itemSpan}>
                <FaFileAlt />
                <p>Resúmenes</p>
              </span>
            </Link>
          </Item>

          <Item>
            <Link href="/create">
              <span className={dropdown.itemSpan}>
                <FaPlusCircle />
                <p>Crear</p>
              </span>
            </Link>
          </Item>
        </Content>
      </Portal>
    </Root>
  );
}

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <nav className={container}>
      <DropdownLogo />

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
