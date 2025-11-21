// app/api/products/add/route.js
import { NextResponse } from "next/server";
import { odooCall } from "../../odooClient";

// POST /api/products/add → create new product in Odoo
export async function POST(req) {
    try {
        const { name, price, stock, description, image_1920 } = await req.json();

        // Basic validation
        if (!name || price == null) {
            return NextResponse.json(
                { error: "Name and price are required" },
                { status: 400 }
            );
        }

        // 1️⃣ Create product in product.product
        const productId = await odooCall("product.product", "create", {
            args: [
                {
                    name,
                    list_price: price,
                    description_sale: description || "",
                    image_1920: image_1920 || null,
                    type: "product",
                },
            ],
        });

        console.log("Created product id:", productId);

        // 2️⃣ If stock provided → create basic stock.quant
        if (stock && Number(stock) > 0) {
            try {
                await odooCall("stock.quant", "create", {
                    args: [
                        {
                            product_id: productId,
                            location_id: 1, // default location (may change in real project)
                            quantity: Number(stock),
                        },
                    ],
                });
            } catch (e) {
                console.warn("Stock quant creation failed:", e);
            }
        }

        return NextResponse.json({
            success: true,
            product_id: productId,
        });
    } catch (error) {
        console.error("POST /api/products/add error:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
