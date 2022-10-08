import { ReactNode } from 'react';
import buttonVariants, { full } from '../styles/components/button.css';

interface Props {
  children: string | ReactNode;
  variant?: 'primary' | 'ghost' | 'caution';
  submit?: boolean;
  wide? : boolean;
  otherClasses?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  wide,
  submit,
  otherClasses,
  onClick,
}: Props) {
  return (
    <button
      className={`${buttonVariants[variant]} ${wide ? full : null} ${otherClasses}`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
