interface Props {
  children: string;
  variant?: "ghost" | "warning" | "warning ghost";
  width?: "w-full";
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
}

export default function Button({
  children,
  variant,
  width,
  type,
  onClick,
}: Props) {
  const classes = ["button", variant, width].join(" ");
  return (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
