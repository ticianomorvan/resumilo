import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';
import {
  dialog, invoker, overlay, actions,
} from 'styles/components/dialog.css';
import Button from './button';

interface Props {
  label: ReactNode | string,
  title: ReactNode | string,
  description: ReactNode | string,
  children: ReactNode,
}

export default function DialogComponent({
  label, title, description, children,
}: Props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className={invoker}>
        {typeof label === 'string' ? <p>{label}</p> : label}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={overlay} />
        <AlertDialog.Content className={dialog}>
          <AlertDialog.Title>
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description>
            {description}
          </AlertDialog.Description>

          <div className={actions}>
            <AlertDialog.Cancel asChild>
              <Button variant="ghost">Cancelar</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              {children}
            </AlertDialog.Action>
          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
