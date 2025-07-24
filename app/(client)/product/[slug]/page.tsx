import {
  getAllProducts,
  getProductBySlug,
  getReviewsByProductId,
} from "@/sanity/helpers/queries";
import { notFound } from "next/navigation";
import ProductPageWrapper from "@/components/ProductPageWrapper";
import { Product } from "@/sanity.types";

// Enable fallback
export const dynamicParams = true;

export async function generateStaticParams() {
  const products: Product[] = await getAllProducts();

  return products
    .filter(
      (product: Product): product is Product & { slug: { current: string } } =>
        !!product.slug?.current
    )
    .map((product: Product & { slug: { current: string } }) => ({
      params: {
        slug: product.slug.current,
      },
    }));
}

interface Props {
  params: { slug: string };
}

export default async function SingleProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const reviews = await getReviewsByProductId(product._id);

  return <ProductPageWrapper product={product as Product} reviews={reviews} />;
}
