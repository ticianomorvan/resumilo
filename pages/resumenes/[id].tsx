import { GetServerSideProps, NextPage } from "next";
import { User } from "../../types/user";
import { Summary } from "../../types/summary";
import { Badge, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "next/link";

interface Props {
  summary: Summary;
  user: User;
}

const SummaryPage: NextPage<Props> = ({ summary, user }) => {
  return (
    <BaseLayout title={summary.title}>
      <VStack>
        <Heading as="h1">{summary.title}</Heading>

        <Heading as="h2" fontWeight="normal">
          {summary.description}
        </Heading>

        <HStack>
          <Badge colorScheme="green">{summary.topic}</Badge>
          {user && (
            <>
              <Text>{user.name}</Text>
              <Link href={`/usuarios/${user.id}`}></Link>
              <Image
                style={{
                  borderRadius: "50%",
                }}
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                width={8}
                height={8}
              />
            </>
          )}
        </HStack>
      </VStack>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id =
    typeof params !== "undefined" && typeof params.id === "string"
      ? params.id
      : null;

  if (!id) return { notFound: true };

  const { getSummaryById, getUserDoc } = await import("../../lib/firebase");

  const summary = await getSummaryById(id);
  const user = await getUserDoc(summary.author_id);

  return {
    props: {
      summary,
      user,
    },
  };
};

export default SummaryPage;
