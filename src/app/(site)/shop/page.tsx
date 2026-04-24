import { Metadata } from "next";
import Shop from "./_component/shop";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Shop - Zeel Fashion`,
  };
}

const ShopPage = async () => {
  return <Shop />;
};

export default ShopPage;
