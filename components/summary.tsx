import { SummaryRecord } from "types/summary";
import Badge from "./badge";
import {
  container,
  date,
  information,
  title,
} from "styles/components/summary.css";
import { formatDistance, parseISO } from "date-fns";
import esLocale from "date-fns/locale/es";
import { useRouter } from "next/router";

interface Props {
  data: SummaryRecord;
}

const transformDate = (raw: string) =>
  formatDistance(parseISO(raw), new Date(), {
    addSuffix: true,
    locale: esLocale,
  });

export default function SummaryItem({ data }: Props) {
  const router = useRouter();
  return (
    <div
      className={container}
      onClick={() => router.push(`/resumenes/${encodeURIComponent(data.id)}`)}
    >
      <span className={information}>
        <p className={title}>{data.title}</p>
        <p className={date}>{transformDate(data.date)}</p>
      </span>
      <Badge label={data.topic} />
    </div>
  );
}
