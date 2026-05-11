import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/loading";
import Payment from "../_component/payment";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Payment - Zeel Fashion`,
  };
}

const PaymentPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Payment />
    </Suspense>
  );
};

export default PaymentPage;
