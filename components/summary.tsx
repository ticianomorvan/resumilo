import { Summary } from "types/summary";
import Badge from "./badge";
import { container } from "styles/components/summary.css";

interface Props {
  data: Summary;
}

export default function SummaryItem({ data }: Props) {
  return (
    <div className={container}>
      <p>{data.title}</p>
      <p>{data.date}</p>
      <Badge label={data.topic} />
      <p>{data.author}</p>
    </div>
  );
}
