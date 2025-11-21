// app/api/products/route.js
import { NextResponse } from "next/server";
import { odooCall } from "../odooClient";

// GET /api/products → fetch list of products from Odoo
export async function GET() {
    try {
        // Using product.product so it matches your previous tests
        const products = await odooCall("product.product", "search_read", {
            args: [[]], // [] = all products
            kwargs: {
                fields: [
                    "id",
                    "name",
                    "list_price",
                    "qty_available",
                    "image_1920",
                    "description_sale",
                ],
                limit: 100, // optional limit
            },
        });

        return NextResponse.json(products || []);
    } catch (error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
