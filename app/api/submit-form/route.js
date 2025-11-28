export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const ODOO_URL = process.env.ODOO_URL;
    const ODOO_DB = process.env.ODOO_DB;
    const ODOO_USERNAME = process.env.ODOO_USERNAME;
    const ODOO_PASSWORD = process.env.ODOO_PASSWORD;

    // Step 1: Authenticate Odoo
    const authRes = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "common",
          method: "authenticate",
          args: [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}],
        },
      }),
    });

    const authData = await authRes.json();
    const uid = authData.result;

    if (!uid) {
      return Response.json({ success: false, error: "Odoo Auth Failed" }, { status: 401 });
    }

    // Step 2: Create Lead in Odoo
    const createRes = await fetch(`${ODOO_URL}/jsonrpc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ODOO_DB,
            uid,
            ODOO_PASSWORD,
            "crm.lead",
            "create",
            [
              {
                name: `Inquiry from ${name}`,
                contact_name: name,
                email_from: email,
                phone: phone,
                description: message,
              },
            ],
          ],
        },
      }),
    });

    const createdLead = await createRes.json();

    return Response.json({ success: true, lead_id: createdLead.result });
  } catch (err) {
    console.error("ODOO ERROR:", err);
    return Response.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
