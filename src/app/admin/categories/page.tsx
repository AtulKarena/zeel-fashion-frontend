import { Metadata } from "next";
import CategoriesList from "./_component/categories-list";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Categories - Zeel Fashion`,
  };
}

const CategoriesPage = async () => {
  return <CategoriesList />;
};

export default CategoriesPage;
