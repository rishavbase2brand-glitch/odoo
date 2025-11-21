export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const productData = req.body;

        // Add default required fields if missing
        if (!productData.uom_id) productData.uom_id = 1;      // default UOM
        if (!productData.categ_id) productData.categ_id = 1;  // default Category

        // Odoo API call
        const response = await fetch("https://test210.odoo.com/web/dataset/call_kw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": "session_id=YrMr1wGdZ7tgSONdz-fTt4ousQGpKeyMKdvKAeqbJ2APk31cwttutjgSMcH2BdeuViinrRbrQ79UsIp9cqHa"
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "call",
                params: {
                    model: "product.template",
                    method: "create",
                    args: [productData],
                    kwargs: {},
                },
            }),
        });

        const data = await response.json();

        if (data.error) return res.status(500).json({ success: false, error: data.error.message });

        res.status(200).json({ success: true, data: data.result });
    } catch (err) {
        console.error("Odoo API error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
}
