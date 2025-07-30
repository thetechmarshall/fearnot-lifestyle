import CategoryProductsWrapper from "@/components/CategoryProductsWrapper";
import Container from "@/components/Container";
import Title from "@/components/Title";


type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


export default async function CategoryPage({ params }: Props) {
  return (
    <Container className="py-10">
      <Title className="text-xl">Product Filter</Title>
      <CategoryProductsWrapper slug={params.slug} />
    </Container>
  );
}