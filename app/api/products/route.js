export async function GET() {
  try {
    const res = await fetch("https://test210.odoo.com/web/dataset/call_kw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie":
          "session_id=g8mwH_2z87JP8uEgGMc2kpqwX21-h9G0XU9T1W9wSeYtjS2Sb-gwo7bfq_iTpZnVv1OYsbWhuU8WiIJpLpl5",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "product.product",
          method: "search_read",
          args: [[]], // filter empty = all products
          kwargs: {
            fields: ["id", "name", "list_price", "qty_available", "image_1920"],
          },
        },
      }),
    });

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
