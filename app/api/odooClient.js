// app/api/odooClient.js
const ODOO_URL = "https://test210.odoo.com";
const ODOO_DB = "test210";

// ⚠️ Odoo credentials
const ODOO_LOGIN = "rishavbase2brand@gmail.com";
const ODOO_PASSWORD = "qwerty!@12345";

// Optional manual fallback SESSION_ID (Postman)
let SESSION_ID = "YrMr1wGdZ7tgSONdz-fTt4ousQGpKeyMKdvKAeqbJ2APk31cwttutjgSMcH2BdeuViinrRbrQ79UsIp9cqHa";

// ---- Authenticate & get SESSION_ID ----
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

    if (data.error) {
        console.error("Odoo login failed:", data.error);
        throw new Error(data.error.message || "Odoo login failed");
    }

    // SESSION_ID from result
    if (data.result?.session_id) {
        SESSION_ID = data.result.session_id;
        console.log("✅ New SESSION_ID:", SESSION_ID);
        return SESSION_ID;
    }

    // fallback to manual SESSION_ID
    if (SESSION_ID) return SESSION_ID;

    throw new Error("Could not get SESSION_ID from Odoo");
}

// ---- Generic Odoo call ----
export async function odooCall(model, method, { args = [], kwargs = {} } = {}) {
    if (!SESSION_ID) await authenticate();

    const doCall = async () => {
        const res = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `session_id=${SESSION_ID}`,
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "call",
                params: { model, method, args, kwargs },
            }),
        });

        return res.json();
    };

    let data = await doCall();

    // If session expired → re-login once
    if (
        data?.error?.message === "Odoo Session Expired" ||
        data?.error?.data?.name === "odoo.http.SessionExpiredException"
    ) {
        console.warn("Odoo session expired, re-authenticating...");
        SESSION_ID = null;
        await authenticate();
        data = await doCall();
    }

    if (data.error) {
        console.error("Odoo error:", data.error);
        throw new Error(data.error.data?.message || data.error.message || "Odoo call failed");
    }

    return data.result;
}
