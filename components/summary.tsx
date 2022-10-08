import { Summary } from 'types/summary';
import {
  container,
  date,
  information,
  title,
} from 'styles/components/summary.css';
import { formatDistance, parseISO } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { useRouter } from 'next/router';
import Badge from './badge';

interface Props {
  data: Summary;
}

const transformDate = (raw: string) => formatDistance(parseISO(raw), new Date(), {
  addSuffix: true,
  locale: esLocale,
});

export default function SummaryItem({ data }: Props) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={container}
      onClick={() => router.push(`/resumenes/${encodeURIComponent(data.id)}`)}
    >
      <span className={information}>
        <p className={title}>{data.title}</p>
        <p className={date}>{transformDate(data.date)}</p>
      </span>
      <Badge label={data.topic} />
    </button>
  );
}
