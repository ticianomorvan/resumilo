interface Props {
  label: string;
}

export default function Badge({ label }: Props) {
  return (
    <span className="text-green-900 bg-green-100 p-2 rounded-lg">{label}</span>
  );
}
