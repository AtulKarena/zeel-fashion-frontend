import { notFound } from "next/navigation";
import EditProductPage from "../../_component/edit-product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditProductPage id={id} />;
}
