import { buttonVariants } from "../styles/components.css";

interface Props {
  children: string;
  width?: "w-full";
  variant?: "primary" | "ghost" | "caution";
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  type,
  onClick,
}: Props) {
  return (
    <button className={buttonVariants[variant]} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
