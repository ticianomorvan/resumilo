import { User } from "../../types/user";
import { GetServerSideProps } from "next";
import Image from "next/image";

// Components
import BaseLayout from "../../components/layouts/BaseLayout";

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  return (
    <BaseLayout title={`${user.name} | Resumilo`}>
      <Image
        src={user.avatar}
        alt={`${user.name}'s profile picture.`}
        width={120}
        height={120}
      />
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      {user.summaries.length > 0 ? (
        user.summaries.map((summary) => (
          <Text key={summary.title}>{summary.title}</Text>
        ))
      ) : (
        <Text>Este usuario no tiene ningún resumen.</Text>
      )}
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { getUserDoc } = await import("../../lib/firebase");
  const uid =
    typeof params !== "undefined" && typeof params.uid === "string"
      ? params.uid
      : null;

  if (!uid) return { notFound: true };

  const user = await getUserDoc(uid);

  return {
    props: {
      user,
    },
  };
};

export default Profile;
