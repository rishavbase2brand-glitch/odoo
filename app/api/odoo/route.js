// app/api/odoo/route.js
import { NextResponse } from "next/server";

const ODOO_URL = "https://test210.odoo.com";
const ODOO_DB = "test210";
const ODOO_LOGIN = "rishavbase2brand@gmail.com";
const ODOO_PASSWORD = "qwerty!@12345";

let SESSION_ID = null;

// Authenticate and get session_id
async function authenticate() {
    const res = await fetch(`${ODOO_URL}/web/session/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: { db: ODOO_DB, login: ODOO_LOGIN, password: ODOO_PASSWORD },
        }),
    });

    const data = await res.json();
    if (!data.result?.session_id) throw new Error("Odoo login failed");

    SESSION_ID = data.result.session_id;
    return SESSION_ID;
}

// Generic Odoo call
async function odooCall(model, method, { args = [], kwargs = {} } = {}) {
    if (!SESSION_ID) await authenticate();

    const res = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${SESSION_ID}`,
        },
        body: JSON.stringify({ jsonrpc: "2.0", method: "call", params: { model, method, args, kwargs } }),
    });

    const data = await res.json();

    // Retry if session expired
    if (
        data?.error?.data?.name === "odoo.http.SessionExpiredException" ||
        data?.error?.message === "Odoo Session Expired"
    ) {
        SESSION_ID = null;
        await authenticate();
        return odooCall(model, method, { args, kwargs });
    }

    if (data.error) throw new Error(data.error.data?.message || data.error.message);
    return data.result;
}

export async function GET() {
    // Fetch all products
    const products = await odooCall("product.template", "search_read", {
        args: [[]], // no filter → all products
        kwargs: { fields: ["id", "name", "list_price"] },
    });
    return NextResponse.json(products);
}

export async function POST(req) {
    const body = await req.json();
    const { name, price } = body;

    // Create product in Odoo
    const newProductId = await odooCall("product.template", "create", {
        args: [{ name, list_price: price }],
    });

    // Fetch newly created product
    const newProduct = await odooCall("product.template", "read", {
        args: [[newProductId]],
        kwargs: { fields: ["id", "name", "list_price"] },
    });

    return NextResponse.json(newProduct[0]);
}
