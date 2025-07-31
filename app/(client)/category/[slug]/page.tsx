import CategoryProductsWrapper from "@/components/CategoryProductsWrapper";
import Container from "@/components/Container";
import Title from "@/components/Title";

// Define the props type to explicitly expect a Promise, as per the new Next.js convention.
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  // Await the promise to resolve it and get the actual params object.
  const resolvedParams = await params;

  const slug = resolvedParams.slug;

  return (
    <Container className="py-10">
      <Title className="text-xl">Product Filter</Title>
      <CategoryProductsWrapper slug={slug} />
    </Container>
  );
}


// Original code

// import CategoryProducts from "@/components/CategoryProducts";
// import Container from "@/components/Container";
// import Title from "@/components/Title";

// const CategoryPage = async ({ params }: { params: { slug: string } }) => {
//   return (
//     <Container className="py-10">
//       <Title className="text-xl">Product Filter</Title>
//       <CategoryProducts slug={params.slug} />
//     </Container>
//   );
// };

// export default CategoryPage;