import { getSerializedSummaries } from 'lib/pocketbase';
import { GetServerSideProps } from 'next';
import { SummaryRecord } from 'types/summary';

// Components & Styling
import BaseLayout from 'components/layouts/base';
import SummaryItem from 'components/summary';
import { summariesContainer, title } from 'styles/pages/resumenes.css';

interface Props {
  summaries: SummaryRecord[];
}

export default function Index({ summaries }: Props) {
  return (
    <BaseLayout title="Resúmenes">
      <h1 className={title}>Últimos resúmenes</h1>
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
