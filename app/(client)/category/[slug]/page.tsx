import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  return (
    <Container className="py-10">
      <Title className="text-xl">Product Filter</Title>
      <CategoryProducts slug={params.slug} />
    </Container>
  );
};

export default CategoryPage;