import useUser from 'hooks/useUser';
import Link from 'next/link';
import { client, getUserAvatar } from 'lib/pocketbase';
import { User } from 'pocketbase';
import {
  action, actions, content, dialog, item, overlay, trigger,
} from 'styles/components/avatar.css';

// Components
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { redirect } from 'lib/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Button from './button';

function CloseSession() {
  const router = useRouter();

  const signOutAction = async () => {
    client.authStore.clear();
    toast.success('Cerraste sesión correctamente.');
    setTimeout(() => redirect({
      router, destination: '/login',
    }));
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className={action}>
        <p>Cerrar sesión</p>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={overlay} />
        <AlertDialog.Content className={dialog}>
          <AlertDialog.Title>
            ¿Estás seguro/a?
          </AlertDialog.Title>
          <AlertDialog.Description>
            Serás reenviado a la pantalla de inicio de sesión.
          </AlertDialog.Description>

          <div className={actions}>
            <AlertDialog.Cancel asChild>
              <Button variant="ghost">Cancelar</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="caution" onClick={signOutAction}>Cerrar sesión</Button>
            </AlertDialog.Action>
          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function AvatarIcon({ user }: { user: User }) {
  if (!user.profile) return null;

  return (
    <Avatar.Root>
      <Avatar.Image
        src={getUserAvatar(user.profile.id, user.profile.avatar)}
        alt={`${user.profile.name}'s profile picture.`}
        height={48}
        width={48}
      />
      <Avatar.Fallback delayMs={600}>{user.profile.name.at(0)}</Avatar.Fallback>
    </Avatar.Root>
  );
}

export default function AvatarComponent() {
  const { user } = useUser();

  if (!user || !user.profile) return null;

  return (
    <Popover.Root>
      <Popover.Trigger className={trigger}>
        <AvatarIcon user={user} />
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content className={content}>
          <Link href="/preferences">
            <p className={item}>Preferencias</p>
          </Link>

          <CloseSession />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
