import { Metadata } from "next";
import InventoryList from "./_component/inventory-list";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Inventory - Zeel Fashion`,
  };
}

const InventoryPage = async () => {
  return <InventoryList />;
};

export default InventoryPage;
