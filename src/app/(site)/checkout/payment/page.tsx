import { Metadata } from "next";
import PaymentPage from "../_component/payment";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Payment - Zeel Fashion`,
  };
}

const CartPage = async () => {

  return <PaymentPage />;
};

export default CartPage;
