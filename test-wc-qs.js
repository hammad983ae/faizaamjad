const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const wcApi = new WooCommerceRestApi({
    url: "https://admin.faaizaamjadstudio.com",
    consumerKey: "ck_872bc5648a98c7e9052d43df7df4e69f4b1de392",
    consumerSecret: "cs_418423c66982b89f196889743018e856734002bc",
    version: "wc/v3",
    queryStringAuth: true,
    axiosConfig: {
        httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false
        })
    }
});
wcApi.get("products", { per_page: 1 })
    .then((response) => {
        console.log("Success! Items:", response.data.length);
    })
    .catch((error) => {
        console.error("Error:", error.response ? error.response.data : error.message);
    });
