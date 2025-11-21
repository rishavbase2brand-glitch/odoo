// pages/api/products.js
export default async function handler(req, res) {
    try {
        const response = await fetch("https://test210.odoo.com/web/dataset/call_kw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": "session_id=YrMr1wGdZ7tgSONdz-fTt4ousQGpKeyMKdvKAeqbJ2APk31cwttutjgSMcH2BdeuViinrRbrQ79UsIp9cqHa",
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "call",
                params: {
                    model: "product.template",
                    method: "search_read",
                    args: [[]], // all products
                    kwargs: { fields: ["id", "name", "list_price", "qty_available", "description_sale", "image_1920", "type"] },
                },
            }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        res.status(200).json(data.result || []);
    } catch (err) {
        console.error("Odoo fetch error:", err);
        res.status(500).json({ error: err.message });
    }
}
