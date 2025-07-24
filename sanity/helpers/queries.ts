import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { client } from "../lib/client";
import { Review } from "@/sanity.types";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == 'product' && slug.current == $slug] | order(name asc) [0]`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.log("Error fetching product by Slug:", error);
    return null;
  }
};

export const getReviewsByProductId = async (
  productId: string
): Promise<Review[]> => {
  try {
    return await client.fetch(
      `*[_type == "review" && product._ref == $productId] | order(date desc) {
        _id,
        name,
        rating,
        comment,
        date
      }`,
      { productId }
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const getAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(
    `*[_type == "category"] | order(sortOrder asc)`
  );
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.log("Error fetching all the categories:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required!");
  }

  const MY_ORDERS_QUERY = defineQuery(`
  *[_type == "order" && clerkUserId == $userId]
    | order(createdAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      orderId,
      customerName,
      customerEmail,
      deliveryAddress,
      clerkUserId,
      shippingFee,
      subtotalAmount,
      totalAmount,
      discountAmount,
      status,
      paid,
      createdAt,
      items[] {
        name,
        variant,
        size,
        quantity,
        price,
        image {
          _type,
          asset->{
            _id,
            _ref,
            _type,
            url
          },
          crop,
          hotspot
        }
      }
    }
`);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders.data || [];
  } catch (error) {
    console.error("Error Fetching Orders:", error);
    return [];
  }
};
