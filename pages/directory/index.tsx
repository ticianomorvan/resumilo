import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import useSWR from "swr";
import { fetcher } from "../../lib/backend";

const Index: NextPage = () => {
  const { data, error } = useSWR("/api/get", fetcher);

  if (error) return <Text>Hubo un error cargando los resúmenes.</Text>;
  if (!data) return <Text>Cargando...</Text>;

  return <main>{data && JSON.stringify(data)}</main>;
};

export default Index;
