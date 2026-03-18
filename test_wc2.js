const { config } = require("dotenv");
config({ path: ".env.local" });

const { default: WooCommerceRestApi } = require("@woocommerce/woocommerce-rest-api");
const https = require("https");

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
        console.log("New Arrivals:", response.data.map((p) => p.name));

        const cats = await wcApi.get("products/categories");
        console.log("Categories:", cats.data.map((c) => ({ name: c.name, slug: c.slug, count: c.count })));

    } catch (err) {
        console.error(err.response?.data || err.message);
    }
}

main();
