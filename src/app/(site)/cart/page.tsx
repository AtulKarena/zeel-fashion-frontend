import { Metadata } from "next";

import Cart from "./_component/cart";
import { isUserLoggedIn } from "@/lib/auth";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Cart - Zeel Fashion`,
  };
}

const CartPage = async () => {
  const isLoggedIn = await isUserLoggedIn();
  return <Cart isLoggedIn={isLoggedIn} />;
};

export default CartPage;
