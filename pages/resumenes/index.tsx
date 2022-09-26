import { Resumen } from "../../types/resumen";
import { GetServerSideProps, NextPage } from "next";
import { getAllResumenes } from "../../lib/utils";
import BaseLayout from "../../components/layouts/BaseLayout";

const Index: NextPage<{ resumenes: Resumen[] }> = ({
  resumenes,
}: {
  resumenes: Resumen[];
}) => {
  return (
    <BaseLayout title="Resúmenes | Resumilo">
      {resumenes.map((resumen) => (
        <p key={resumen.title}>{resumen.title}</p>
      ))}
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const resumenes = await getAllResumenes();

  return {
    props: {
      resumenes,
    },
  };
};

export default Index;
