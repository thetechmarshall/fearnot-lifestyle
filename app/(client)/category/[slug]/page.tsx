import { NextPage } from 'next';
import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { Category } from "@/sanity.types";
import { getAllCategories } from "@/sanity/helpers/queries";
import { notFound } from 'next/navigation';

export const dynamicParams = true;

interface Props {
  params: { slug: string };
}

const CategoryPage: NextPage<Props> = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    notFound();
  }

  return (
    <Container className="py-10">
      <Title className="text-xl">Product Filter</Title>
      <CategoryProducts slug={slug} />
    </Container>
  );
};

export async function generateStaticParams(): Promise<{ params: { slug: string } }[]> {
  const categories: Category[] = await getAllCategories();

  return categories
    .filter((category): category is Category & { slug: { current: string } } => !!category.slug?.current)
    .map((category) => ({
      params: {
        slug: category.slug.current,
      },
    }));
}

export default CategoryPage;