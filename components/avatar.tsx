import { client, getUserAvatar } from 'lib/pocketbase';
import { User } from 'pocketbase';
import {
  content, fallback, image, item, trigger,
} from 'styles/components/avatar.css';
import { redirect } from 'lib/utils';
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import toast from 'react-hot-toast';

// Components
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import DialogComponent from './dialog';
import Button from './button';

function AvatarIcon({ user }: { user: User }) {
  if (!user.profile) return null;

  return (
    <Avatar.Root>
      <Avatar.Image
        className={image}
        src={getUserAvatar(user.profile.id, user.profile.avatar)}
        alt={`${user.profile.name}'s profile picture.`}
        height={48}
        width={48}
      />
      <Avatar.Fallback className={fallback} delayMs={600}>
        {`${user.email.toUpperCase().split('.')[0][0]}${user.email.toUpperCase().split('.')[1][1]}`}
        {/* john.doe@gmail.com => JD */}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}

export default function AvatarComponent() {
  const { user } = useUser();
  const router = useRouter();

  if (!user || !user.profile) return null;

  const signOutAction = () => {
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
            title="¿Estás seguro/a?"
            description="Serás redirigido a la pantalla de inicio de sesión."
            label="Cerrar sesión"
          >
            <Button variant="caution" onClick={signOutAction}>
              Cerrar sesión
            </Button>
          </DialogComponent>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
