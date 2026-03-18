import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/woocommerce";
import { Product } from "@/types/product";
import Link from "next/link";

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Zinnia Noir",
    price: "PKR 32,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDROpCUXx38p3zpf1U7j-f0m8ivh53bCq627lE1P3v3-NC2X6oAdM5T5jH0tl_idh-4Bp-9wOD6njBfGPwSvBzwgJewCgZ2hd2x6sC9D3YOBqDOt-rwP0O3J8HRAUEfb0YQEOaKOCG6lqvSGq1hmXELPDokKCkXxXr4OXnd_pASDgOYNEDrbS-JIUb3H5IRAIu8kkU1ohbbxzXpPfucCV0qpRUBzCImG8m0so1vXN1R8rEdIw4XqCCo17xd-wMN-UkLF_lxK5kqIj5A",
  },
  {
    id: "2",
    name: "Coral Serenity",
    price: "PKR 28,900",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYXF_HoRm_m3UY9A6SR2u6MN2tbQnaE7kGf0-IKlIhBCaKs-iLEKFs7BNjmJHQ6pRh4akwQDVKj6uOhkepa-H5S96lGlYaLsjtcIF2bcrNFzAzcPl2i4CNvjl-oEjtp1J9_BYMA4PAP_l24MbJJgwUzjLtgdD5YD8A9et0vgX1YDj4Lcfqy7Fl1-VWtvaJ45kMNvPlF3-Cmk11zai8Ri0AUgAypRfVr4u6SN6GwSB8EugzxBQejXIIxzHqDq7kBbVcwcn7Ok3ji16l",
  },
  {
    id: "3",
    name: "Ethereal White",
    price: "PKR 25,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfaa10wem24upUaz80JeEE4b242sug83OVh3bBQSOi0MGXt5tVM3sE9-bfeKd95_YMTHXJINYfc5P8YYH9TTlp4aRKaqrn-EzJa2ZsGS5uuwoPoFVPqDsncDQnk8y5KGZRD-kZUPrgQYRL65Q2v0jKTN8IR9-024o2VQew2GNj0lZwzQf_jJdl2RJUoHRlN2D-q8Rw9tavWvXDBzimcriBSTGaTYKMW6jfLva4VN4RHjY9e7ByiMwMWKeBfaGKaaqbsV3hySA8Mfde",
  },
  {
    id: "4",
    name: "Velvet Rose",
    price: "PKR 45,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4fq0phdAobR3JjD9CptuDb8096R67UKXcf7gSDVQKz7WNbTvCEPS0Q83JOvuYdc2ogUMwKrBGnIuSvzNsH1hYJYXe6YyQu1EJQQ8pEiH9IQ3iqPOdZC_33f8Xssazb_qNhLIMS5cbKmX-zEtYGUJhIyQ0r8OngEeZyiAPP_m473HQ0JiQIlpPZAUIi6BY1ETab3ZnI96rOKukWL40yFBMrLoNA5dUTwtkPsfD8FK47qMF8rmddt0aTcHrVaAg3XGK6rHwx9MUHhw9",
  },
];

export default async function NewArrivals() {
  const { products: wcProducts } = await getProducts({ per_page: 4, orderby: "date", order: "desc" });

  let productsToDisplay: Product[] = fallbackProducts;

  if (wcProducts && wcProducts.length > 0) {
    productsToDisplay = wcProducts.map((p: any) => ({
      id: p.slug,
      name: p.name,
      price: `PKR ${parseInt(p.price || "0").toLocaleString()}`,
      image: p.images?.[0]?.src || "https://placehold.co/600x800?text=No+Image",
    }));
  }

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-16 md:py-24 border-b border-primary/5">
      <div className="flex flex-col items-center mb-12">
        <h3 className="font-display text-3xl md:text-4xl text-center mb-2">New Arrivals</h3>
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">
          The Latest from our Atelier
        </p>
        <div className="w-12 h-[1px] bg-primary" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {productsToDisplay.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          className="text-[11px] uppercase tracking-widest font-bold border-b border-slate-900 pb-1 hover:text-primary hover:border-primary transition-colors"
          href="/products?category=new-arrivals"
        >
          View All New Arrivals
        </Link>
      </div>
    </section>
  );
}
