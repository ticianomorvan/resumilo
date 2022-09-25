import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import ResumenItem from "../../components/resumen_item";
import { getAllResumenes } from "../../lib/firestore";
import { Resumen } from "../../types/resumen";

const Index: NextPage<{ resumenes: Resumen[] }> = ({
  resumenes,
}: {
  resumenes: Resumen[];
}) => {
  return (
    <BaseLayout>
      {resumenes.map((resumen) => (
        <ResumenItem
          key={resumen.title}
          title={resumen.title}
          date={resumen.date}
          topic={resumen.topic}
          author={resumen.author}
        />
      ))}
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const resumenes = (await getAllResumenes()).docs.map(
    (document) => document.data() as Resumen
  );

  return {
    props: {
      resumenes,
    },
  };
};

export default Index;
