import { badge } from "../styles/components.css";

interface Props {
  label: string;
}

export default function Badge({ label }: Props) {
  return <span className={badge}>{label}</span>;
}
