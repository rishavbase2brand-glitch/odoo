import callOdoo from '../../odooClient';

export async function POST(req) {
    if (req.method !== 'POST') {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    try {
        const body = await req.json();
        const { name, list_price, initial_stock, description } = body;

        // Prepare data for Odoo's 'product.template' model
        const productData = {
            name: name,
            list_price: parseFloat(list_price) || 0.0,
            sale_ok: true, // Make the product sellable
            type: 'product', // Default type is storable product
            description_sale: description || false,
            // Default required fields (must match your Odoo installation)
            uom_id: 1, // Unit of Measure: Units (ID 1 is common default)
            uom_po_id: 1, // Purchase Unit of Measure
            categ_id: 1, // Product Category: All / (ID 1 is common default)
        };

        // 1. Create the product template using the centralized callOdoo function.
        // This function handles authentication and session ID automatically using the API Key.
        const newProductId = await callOdoo('product.template', 'create', [productData]);

        if (!newProductId) {
            throw new Error("Odoo returned no ID after creation.");
        }

        // --- Stock update logic skipped for now to prevent Odoo complexity errors ---
        const stockQty = parseInt(initial_stock, 10);
        if (stockQty > 0) {
             console.warn("Stock update skipped to prevent complex Odoo errors. Stock should be adjusted via Inventory app.");
        }
        // --- End Stock update logic ---


        return Response.json({ 
            message: 'Product created successfully in Odoo.', 
            productId: newProductId 
        }, { status: 201 });

    } catch (error) {
        console.error("Error in /api/products/add POST:", error.message);
        return Response.json({ 
            error: `Failed to create product in Odoo: ${error.message}`
        }, { status: 500 });
    }
}