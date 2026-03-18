import { NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
        return NextResponse.json({ products: [] });
    }

    try {
        const response = await wcApi.get("products", {
            search: q,
            per_page: 5,
        });

        const products = response.data.map((p: any) => ({
            id: p.slug,
            slug: p.slug,
            name: p.name,
            price: `PKR ${parseInt(p.price || "0").toLocaleString()}`,
            image: p.images?.[0]?.src || "https://placehold.co/600x800?text=No+Image",
        }));

        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error searching WooCommerce products:", error);
        return NextResponse.json({ products: [] }, { status: 500 });
    }
}
