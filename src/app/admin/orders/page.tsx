import { Metadata } from "next";
import OrdersList from "./_component/order-list";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Orders - Zeel Fashion`,
  };
}

const OrderPage = async () => {
  return <OrdersList />;
};

export default OrderPage;
