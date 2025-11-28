export async function getBlogs() {
  const ODOO_URL = "https://test210.odoo.com";
  const ODOO_DB = "test210";
  const ODOO_LOGIN = "rishavbase2brand@gmail.com";
  const ODOO_PASSWORD = "qwerty!@12345";

  // 1️⃣ Login (get session_id)
  const loginRes = await fetch(`${ODOO_URL}/web/session/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      params: {
        db: ODOO_DB,
        login: ODOO_LOGIN,
        password: ODOO_PASSWORD,
      },
    }),
  });

  const loginData = await loginRes.json();

  if (!loginData.result || !loginData.result.uid) {
    throw new Error("Odoo login failed");
  }

  const sessionId = loginRes.headers.get("set-cookie");

  // 2️⃣ Fetch Blog Posts
  const blogRes = await fetch(`${ODOO_URL}/web/dataset/call_kw/blog.post/search_read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionId,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "blog.post",
        domain: [],
        fields: ["name", "content", "subtitle", "website_url", "create_date"],
        limit: 20,
      },
    }),
  });

  const blogData = await blogRes.json();
  return blogData.result;
}
