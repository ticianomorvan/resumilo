import { resumen, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";

type Props = {
  data: string;
};

const Resumen: NextPage<Props> = ({ data }) => {
  const note = JSON.parse(data) as resumen;
  return (
    <main>
      <p>{note.name}</p>
      <p>{note.content}</p>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof params !== "undefined" && typeof params.id === "string") {
    const prisma = new PrismaClient();
    const note = prisma.resumen.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    return {
      props: {
        data: JSON.stringify(note),
      },
    };
  }

  return {
    notFound: true,
  };
};

export default Resumen;
