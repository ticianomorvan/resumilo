import { getSummaryDocument, getUserById } from 'lib/pocketbase';
import { FaDownload } from 'react-icons/fa';
import { SummaryRecord } from 'types/summary';
import Pocketbase, { User } from 'pocketbase';
import * as styles from 'styles/pages/resumenes.css';

// Components
import BaseLayout from 'components/layouts/base';
import Button from 'components/button';
import Profile from 'components/profile';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

interface Props {
  data: string;
}

export default function SummaryPage({ data }: Props) {
  const [summary, setSummary] = useState<SummaryRecord>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setSummary(JSON.parse(data) as SummaryRecord);
  }, [data]);

  useEffect(() => {
    if (!summary) return;
    getUserById(summary.author).then((value) => setUser(value));
  }, [summary]);

  if (!summary) return <p>Cargando...</p>;

  return (
    <BaseLayout title={summary.title}>
      <h1>{summary.title}</h1>
      <span className={styles.information}>
        <p>{summary.description.length > 0 ? summary.description : 'No se dió una descripción.'}</p>
        <a
          href={getSummaryDocument(summary.id, summary.document)}
          target="_blank"
          rel="noreferrer"
        >
          <Button>
            <span className={styles.downloadButton}>
              <FaDownload />
              Descargar
            </span>
          </Button>
        </a>
      </span>

      <h2>Autor</h2>
      {user && <Profile data={user} />}
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }

  const client = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE);

  const summary = await client.records.getOne('summaries', params.id);

  return {
    props: {
      data: JSON.stringify(summary),
    },
  };
};
