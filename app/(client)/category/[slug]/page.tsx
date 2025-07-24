import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { Category } from "@/sanity.types";
import { getAllCategories } from "@/sanity/helpers/queries";

// 🟡 Optional: enables fallback for runtime params
export const dynamicParams = true;

// ✅ Tells Next.js which paths to statically generate
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories
  .filter((category: Category) => category.slug?.current)
  .map((category: Category) => ({
    slug: category.slug!.current,
  }));
}

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  return (
    <Container className="py-10">
      <Title className="text-xl">Product Filter</Title>
      <CategoryProducts slug={params.slug} />
    </Container>
  );
};

export default CategoryPage;
