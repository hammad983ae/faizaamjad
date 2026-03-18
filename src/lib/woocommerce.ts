import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import https from "https";

export const wcApi = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
    queryStringAuth: true,
    axiosConfig: {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    },
});

export async function getProducts(options = {}) {
    try {
        const response = await wcApi.get("products", options);
        return {
            products: response.data,
            totalPages: parseInt(response.headers['x-wp-totalpages'] || "1"),
            totalProducts: parseInt(response.headers['x-wp-total'] || "0")
        };
    } catch (error) {
        console.error("Error fetching WC products:", error);
        return { products: [], totalPages: 1, totalProducts: 0 };
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const response = await wcApi.get("products", { slug });
        return response.data[0] || null;
    } catch (error) {
        console.error(`Error fetching WC product config for ${slug}:`, error);
        return null;
    }
}

export async function getCategories(options = {}) {
    try {
        const response = await wcApi.get("products/categories", options);
        return response.data;
    } catch (error) {
        console.error("Error fetching WC categories:", error);
        return [];
    }
}
