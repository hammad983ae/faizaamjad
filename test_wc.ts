import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import https from "https";

const wcApi = new WooCommerceRestApi({
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

async function main() {
    try {
        const response = await wcApi.get("products", { per_page: 4, orderby: "date", order: "desc" });
        console.log("New Arrivals:");
        console.log(response.data.map((p: any) => ({ name: p.name, slug: p.slug })));

        const cats = await wcApi.get("products/categories", { slug: "top-picks" });
        console.log("Categories:", cats.data);

    } catch (err: any) {
        console.error(err.response?.data || err.message);
    }
}

main();
