import { Metadata } from "next";
import AdminDashboard from "./_component/dashboard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Dashboard - Zeel Fashion`,
  };
}

const AdminDashboardPage = async () => {
  return <AdminDashboard />;
};

export default AdminDashboardPage;
