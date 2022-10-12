import { client, getUserAvatar } from 'lib/pocketbase';
import { User } from 'pocketbase';
import { content, item, trigger } from 'styles/components/avatar.css';
import { redirect } from 'lib/utils';
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import toast from 'react-hot-toast';

// Components
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import DialogComponent from './dialog';

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
  const router = useRouter();

  if (!user || !user.profile) return null;

  const signOutAction = async () => {
    client.authStore.clear();
    toast.success('Cerraste sesión correctamente.');
    redirect({
      router, destination: '/login',
    });
  };

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

          <DialogComponent
            action={{
              dispatch: signOutAction,
              label: 'Cerrar sesión',
            }}
            title="¿Estás seguro/a?"
            description="Serás redirigido a la pantalla de inicio de sesión."
            label="Cerrar sesión"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
