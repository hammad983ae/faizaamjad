"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterSidebar, { Category } from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { Product } from "@/types/product";

const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"];

function toLabel(slug: string) {
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

export default function ClientPage({
    productsData,
    categorySlug,
    categoryName,
    categories = []
}: {
    productsData: { products: any[], totalPages: number, totalProducts: number },
    categorySlug?: string,
    categoryName?: string,
    categories?: Category[]
}) {
    const products = productsData.products;
    const totalPages = productsData.totalPages;
    const totalProducts = productsData.totalProducts;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedCategories = categorySlug ? categorySlug.split(",") : [];
    const minPrice = searchParams.get("min_price") || "";
    const maxPrice = searchParams.get("max_price") || "";

    const handleApplyFilters = (newCategories: string[], newMinPrice: string, newMaxPrice: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newCategories.length > 0) {
            params.set("category", newCategories.join(","));
        } else {
            params.delete("category");
        }

        if (newMinPrice) params.set("min_price", newMinPrice);
        else params.delete("min_price");

        if (newMaxPrice) params.set("max_price", newMaxPrice);
        else params.delete("max_price");

        params.set("page", "1"); // Reset to page 1 on filter change
        router.push(`${pathname}?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };
    const [sortOpen, setSortOpen] = useState(false);
    const [sort, setSort] = useState("Newest");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Parse WC products
    const formattedProducts = products.map(p => ({
        id: p.slug,
        slug: p.slug,
        name: p.name,
        subtitle: p.categories?.[0]?.name || "Uncategorized",
        price: `PKR ${parseInt(p.price || "0").toLocaleString()}`,
        image: p.images?.[0]?.src || "https://placehold.co/600x800?text=No+Image",
        badge: p.featured ? { label: "Featured", style: "bg-primary text-white" } : null,
    }));

    const displayTitle = categoryName || "All Collections";
    const displayDesc = categoryName
        ? `Explore our ${categoryName} collection — curated pieces blending heritage craft with contemporary design.`
        : "Discover our latest artisanal creations, blending traditional techniques with contemporary silhouettes.";

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 mb-2">
                        <Link className="hover:text-primary transition-colors" href="/">Home</Link>
                        <span>/</span>
                        <Link className="hover:text-primary transition-colors" href="/products">Collections</Link>
                        {categoryName && (
                            <>
                                <span>/</span>
                                <span className="text-slate-900 font-semibold">{categoryName}</span>
                            </>
                        )}
                    </div>
                    <h2 className="font-display text-4xl font-bold">{displayTitle}</h2>
                    <p className="text-slate-500 max-w-lg">{displayDesc}</p>
                </div>

                {/* Sort + Mobile Filter Trigger */}
                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="relative">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium whitespace-nowrap border border-slate-200"
                        >
                            Sort By: {sort}
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                        </button>
                        {sortOpen && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 min-w-[200px]">
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => { setSort(option); setSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors ${sort === option ? "text-primary font-semibold" : ""
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="md:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
                    >
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filters
                    </button>
                </div>
            </div>

            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileFiltersOpen(false)}
                    />
                    <div className="relative ml-auto w-72 h-full bg-white overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg">Filters</h3>
                            <button onClick={() => setMobileFiltersOpen(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <FilterSidebar
                            categories={categories}
                            initialSelected={selectedCategories}
                            initialMinPrice={minPrice}
                            initialMaxPrice={maxPrice}
                            onApply={handleApplyFilters}
                            onClose={() => setMobileFiltersOpen(false)}
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-12">
                <div className="hidden md:block">
                    <FilterSidebar
                        categories={categories}
                        initialSelected={selectedCategories}
                        initialMinPrice={minPrice}
                        initialMaxPrice={maxPrice}
                        onApply={handleApplyFilters}
                    />
                </div>

                <div className="flex-1">
                    {formattedProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                            <span className="material-symbols-outlined text-5xl text-slate-300">search_off</span>
                            <p className="text-slate-500">No products found in this category yet.</p>
                            <Link
                                href="/products"
                                className="text-sm font-bold text-primary underline underline-offset-4"
                            >
                                View All Collections
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {formattedProducts.map((product) => (
                                <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <button
                                            onClick={(e) => e.preventDefault()}
                                            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-slate-900">favorite</span>
                                        </button>
                                        {product.badge && (
                                            <div className="absolute bottom-4 left-4">
                                                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${product.badge.style}`}>
                                                    {product.badge.label}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-2">{product.subtitle}</p>
                                    <p className="font-bold">{product.price}</p>
                                </Link>
                            ))}
                        </div>
                    )}

                    {formattedProducts.length > 0 && (
                        <Pagination
                            currentPage={parseInt(searchParams.get("page") || "1")}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
