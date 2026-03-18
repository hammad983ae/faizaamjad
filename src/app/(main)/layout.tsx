import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/woocommerce";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories({ hide_empty: true });

  const formattedCategories = categories.map((cat: any) => ({
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
  }));

  return (
    <>
      <Header categories={formattedCategories} />
      {children}
      <Footer />
    </>
  );
}
