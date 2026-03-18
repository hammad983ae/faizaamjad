import { NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { form, items } = body;

        // Build line items for WooCommerce
        const lineItems = items.map((item: any) => ({
            product_id: parseInt(item.id, 10),
            quantity: item.quantity,
        }));

        const orderData = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: false,
            billing: {
                first_name: form.firstName,
                last_name: form.lastName,
                address_1: form.address,
                address_2: form.apt || "",
                city: form.city,
                state: "",
                postcode: form.postalCode,
                country: form.country,
                email: form.email,
                phone: form.phone,
            },
            shipping: {
                first_name: form.firstName,
                last_name: form.lastName,
                address_1: form.address,
                address_2: form.apt || "",
                city: form.city,
                state: "",
                postcode: form.postalCode,
                country: form.country,
            },
            line_items: lineItems,
            shipping_lines: [
                {
                    method_id: form.shipping === "express" ? "flat_rate" : "free_shipping",
                    method_title: form.shipping === "express" ? "Express Shipping" : "Standard Shipping",
                    total: form.shipping === "express" ? "1200.00" : "500.00",
                },
            ],
        };

        const response = await wcApi.post("orders", orderData);

        return NextResponse.json({ success: true, orderId: response.data.id });
    } catch (error: any) {
        console.error("Error creating WooCommerce order:", error.response?.data || error);
        return NextResponse.json(
            { success: false, error: error.response?.data?.message || "Failed to create order" },
            { status: 500 }
        );
    }
}
