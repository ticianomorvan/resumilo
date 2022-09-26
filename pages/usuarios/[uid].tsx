import { User } from "../../types/user";
import { GetServerSideProps } from "next";
import { getUserDoc } from "../../lib/utils";
import Image from "next/image";

// Components
import BaseLayout from "../../components/layouts/BaseLayout";
import { Text } from "@chakra-ui/react";

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
      {user.resumenes.length > 0 ? (
        user.resumenes.map((resumen) => (
          <Text key={resumen.title}>{resumen.title}</Text>
        ))
      ) : (
        <Text>Este usuario no tiene ningún resumen.</Text>
      )}
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const uid =
    typeof params !== "undefined" && typeof params.uid === "string"
      ? params.uid
      : null;

  if (!uid) {
    return {
      notFound: true,
    };
  }

  const user = await getUserDoc(uid);

  return {
    props: {
      user,
    },
  };
};

export default Profile;
