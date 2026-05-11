import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/loading";
import Shop from "./_component/shop";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Shop - Zeel Fashion`,
  };
}

const ShopPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Shop />
    </Suspense>
  );
};

export default ShopPage;
