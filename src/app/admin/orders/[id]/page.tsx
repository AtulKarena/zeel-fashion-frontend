import { Metadata } from "next";
import OrderView from "../_component/order-view";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Orders - Zeel Fashion`,
  };
}

const OrderViewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <OrderView orderId={id} />;
};

export default OrderViewPage;
