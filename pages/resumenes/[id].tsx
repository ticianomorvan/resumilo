import { getSummaryById, getSummaryDocument } from 'lib/pocketbase';
import { GetServerSideProps } from 'next';
import { FaDownload } from 'react-icons/fa';
import { downloadButton } from 'styles/pages/resumenes.css';
import { SummaryRecord } from 'types/summary';

// Components
import BaseLayout from 'components/layouts/base';
import Button from 'components/button';

interface Props {
  summary: SummaryRecord;
}

export default function SummaryPage({ summary }: Props) {
  if (!summary) return <p>Cargando...</p>;

  return (
    <BaseLayout title={summary.title}>
      <h1>{summary.title}</h1>
      <h2>{summary.description}</h2>
      <a
        href={getSummaryDocument(summary.id, summary.document)}
        target="_blank"
        rel="noreferrer"
      >
        <Button>
          <span className={downloadButton}>
            <FaDownload />
            Descargar
          </span>
        </Button>
      </a>
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id) {
    const id = String(params.id);
    const summary = await getSummaryById(id);

    return {
      props: {
        summary,
      },
    };
  }

  return {
    notFound: true,
  };
};
