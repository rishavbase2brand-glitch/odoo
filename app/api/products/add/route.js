import { callOdoo } from '../odooClient'; // FIX: Single dot-dot (../)
import { NextResponse } from 'next/server';

export async function POST(req) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

    try {
        const productData = await req.json();

        // Add default required fields if missing
        // These IDs (1) are common defaults in Odoo
        if (!productData.uom_id) productData.uom_id = 1; // default UOM (Units)
        if (!productData.categ_id) productData.categ_id = 1; // default Category (All)

        // 1. Create the product template using the centralized callOdoo function
        const newProductId = await callOdoo(
            'product.template',
            'create',
            // Arguments: Array containing the product fields object
            [productData] 
        );

        if (!newProductId || typeof newProductId !== 'number') {
            throw new Error(`Odoo returned invalid ID after creation: ${newProductId}`);
        }

        // 2. Return success response with the new ID
        return NextResponse.json({
            message: 'Product created successfully in Odoo.',
            productId: newProductId
        }, { status: 201 });

    } catch (error) {
        console.error("Error in /api/products/add POST:", error.message);
        return NextResponse.json({
            error: error.message,
            message: 'Failed to create product in Odoo.'
        }, { status: 500 });
    }
}