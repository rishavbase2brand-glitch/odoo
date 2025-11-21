import { callOdoo } from '../odooClient'; // FIX: Named Import
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Odoo's 'product.template' model holds product master data.
        const products = await callOdoo(
            'product.template',
            'search_read',
            // Arguments: [Domain, Fields to read]
            [[], ['id', 'name', 'list_price', 'qty_available', 'default_code', 'image_128', 'uom_id', 'categ_id']],
            { 
                limit: 20, 
                // Order by ID descending so newest products appear first
                order: 'id desc' 
            }
        );

        // Fetching UOM and Category details for IDs returned by search_read
        // The search_read returns [ID, Name] for relation fields (like uom_id and categ_id)

        // The structure of the response must be compatible with the client.
        return NextResponse.json({ 
            products: products, 
            message: 'Products fetched successfully from Odoo.' 
        }, { status: 200 });

    } catch (error) {
        console.error("Error in /api/products GET:", error.message);
        // Return a detailed error response
        return NextResponse.json({
            error: error.message,
            message: 'Failed to fetch products from Odoo.'
        }, { status: 500 });
    }
}