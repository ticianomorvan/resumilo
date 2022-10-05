import { ReactNode } from "react";
import { buttonVariants } from "../styles/components/button.css";

interface Props {
  children: string | ReactNode;
  variant?: "primary" | "ghost" | "caution";
  type?: "button" | "reset" | "submit";
  otherClasses?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  type,
  otherClasses,
  onClick,
}: Props) {
  return (
    <button
      className={`${buttonVariants[variant]} ${otherClasses}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
