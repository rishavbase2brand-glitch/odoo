export async function GET(_, { params }) {
    const { id } = params;

    try {
        const res = await fetch("https://test210.odoo.com/web/dataset/call_kw", {
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
                    method: "search_read",
                    args: [
                        [["id", "=", Number(id)]],
                    ],
                    kwargs: {
                        fields: ["id", "name", "list_price", "qty_available", "image_1920"],
                    }
                }
            })
        });

        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
