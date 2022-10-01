import dynamic from "next/dynamic";
import { Suspense } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
const Search = dynamic(() => import("../components/search"));

const Index = () => {
  return (
    <BaseLayout title="Resúmenes">
      <h1>Comenzá a buscar</h1>
      <Suspense fallback={`Loading...`}>
        <Search />
      </Suspense>
    </BaseLayout>
  );
};

export default Index;
