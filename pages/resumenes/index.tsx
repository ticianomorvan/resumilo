import { getSerializedSummaries } from 'lib/pocketbase';
import { GetServerSideProps } from 'next';
import { SummaryRecord } from 'types/summary';

// Components & Styling
import BaseLayout from 'components/layouts/base';
import SummaryItem from 'components/summary';
import { summariesContainer } from 'styles/pages/resumenes.css';
import Search from 'components/search';

interface Props {
  summaries: SummaryRecord[];
}

export default function Index({ summaries }: Props) {
  return (
    <BaseLayout title="Resúmenes">
      <h1>Buscá un resumen</h1>
      <Search />
      <h2>Últimos resúmenes</h2>
      <div className={summariesContainer}>
        {summaries
          && summaries.map((summary) => (
            <SummaryItem key={summary.id} data={summary} />
          ))}
      </div>
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const summaries = await getSerializedSummaries();
  return {
    props: {
      summaries,
    },
  };
};
