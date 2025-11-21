import { NextResponse } from "next/server";

const ODOO_URL = "https://test210.odoo.com/web/session/authenticate";
const DB = "test210";
const USER = "rishavbase2brand@gmail.com";
const PASSWORD = "qwerty!@12345";

export async function GET() {
    try {
        const payload = {
            jsonrpc: "2.0",
            method: "call",
            params: { db: DB, login: USER, password: PASSWORD },
            id: new Date().getTime(),
        };

        const res = await fetch(ODOO_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data.error) return NextResponse.json({ success: false, error: data.error });

        return NextResponse.json({ success: true, session_id: data.result.session_id });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
