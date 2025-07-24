import {
  getProductBySlug,
  getReviewsByProductId,
} from "@/sanity/helpers/queries";
import { notFound } from "next/navigation";
import ProductPageWrapper from "@/components/ProductPageWrapper";

interface Props {
  params: { slug: string };
}

export default async function SingleProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const reviews = await getReviewsByProductId(product._id);

  return <ProductPageWrapper product={product} reviews={reviews} />;
}
