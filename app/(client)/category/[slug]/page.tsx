import CategoryProductsWrapper from "@/components/CategoryProductsWrapper"; 
import Container from "@/components/Container";
import Title from "@/components/Title";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  return (
    <Container className="py-10">
      <Title className="text-xl">Product Filter</Title>
      <CategoryProductsWrapper slug={params.slug} />
    </Container>
  );
};

export default CategoryPage;