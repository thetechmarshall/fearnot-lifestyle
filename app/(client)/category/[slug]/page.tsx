import CategoryProductsWrapper from "@/components/CategoryProductsWrapper";
import Container from "@/components/Container";
import Title from "@/components/Title";

// This is the implementation of the PageProp Promise type error fix.
// It types the props object itself as containing a Promise.
export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // We MUST await the promise to get the actual params object
  const { slug } = await props.params;

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