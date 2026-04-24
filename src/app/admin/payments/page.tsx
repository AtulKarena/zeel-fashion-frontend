import { Metadata } from "next";
import PaymentsList from "./_component/payment-list";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Payments - Zeel Fashion`,
  };
}

const PaymentsPage = async () => {
  return <PaymentsList />;
};

export default PaymentsPage;
