import { Metadata } from "next";
import ProductsList from "./_component/products-list";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Products List - Zeel Fashion`,
  };
}

const ProductsPage = async () => {
  return <ProductsList />;
};

export default ProductsPage;
