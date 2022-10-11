import useUser from 'hooks/useUser';
import Link from 'next/link';
import { getUserAvatar } from 'lib/pocketbase';
import { User } from 'pocketbase';
import {
  action, content, item, trigger,
} from 'styles/components/avatar.css';

// Components
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

function CloseSession() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className={action}>
        <p>Cerrar sesión</p>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title />
          <AlertDialog.Description />
          <AlertDialog.Cancel />
          <AlertDialog.Action />
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
