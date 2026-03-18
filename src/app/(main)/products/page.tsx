import { Suspense } from "react";
import ClientPage from "./ClientPage";
import { getProducts, getCategories, wcApi } from "@/lib/woocommerce";

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; min_price?: string; max_price?: string; page?: string };
}) {
  const { category, search, min_price, max_price, page } = await searchParams;

  const allCategories = await getCategories();

  if (!allCategories || allCategories.length === 0) {
    console.warn("NO CATEGORIES RETURNED FROM WC API");
  }

  const formattedCategories = (allCategories || []).map((c: any) => ({
    name: c.name,
    slug: c.slug,
    count: c.count
  }));

  let categoryName = "";
  let categoryIds: number[] = [];

  if (category) {
    const categorySlugs = category.split(",");
    const matchedCats = allCategories.filter((c: any) => categorySlugs.includes(c.slug));
    categoryIds = matchedCats.map((c: any) => c.id);
    categoryName = matchedCats.map((c: any) => c.name).join(", ");
  }

  const queryOptions: any = {
    per_page: 24,
    page: page || "1"
  };

  if (categoryIds.length > 0) {
    queryOptions.category = categoryIds.join(",");
  }

  if (min_price) queryOptions.min_price = min_price;
  if (max_price) queryOptions.max_price = max_price;
  if (search) queryOptions.search = search;

  // for that specific filter, but still show the sidebar.
  const productsData = (category && categoryIds.length === 0)
    ? { products: [], totalPages: 1, totalProducts: 0 }
    : await getProducts(queryOptions);

  return (
    <Suspense>
      <ClientPage
        productsData={productsData}
        categorySlug={category}
        categoryName={categoryName}
        categories={formattedCategories}
      />
    </Suspense>
  );
}
