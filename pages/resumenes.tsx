import { Heading } from "@chakra-ui/react";
import BaseLayout from "../components/layouts/BaseLayout";
import Search from "../components/search";

const Index = () => {
  return (
    <BaseLayout title="Resúmenes">
      <Heading fontSize="5xl" fontWeight="light">
        Comenzá a buscar
      </Heading>
      <Search />
    </BaseLayout>
  );
};

export default Index;
