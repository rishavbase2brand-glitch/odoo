export async function GET() {
  try {
    const ODOO_URL = "https://test210.odoo.com";
    const ODOO_DB = "test210";
    const ODOO_LOGIN = "rishavbase2brand@gmail.com";
    const ODOO_PASSWORD = "qwerty!@12345";

    // 1) LOGIN → session_id lene ke liye
    const authRes = await fetch(`${ODOO_URL}/web/session/authenticate`, {
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

    const authData = await authRes.json();

    if (!authData.result) {
      return Response.json({ error: "Auth failed" }, { status: 401 });
    }

    const sessionId = authRes.headers
      .get("set-cookie")
      ?.split("session_id=")[1]
      ?.split(";")[0];

    // 2) READ BLOG POSTS (model: blog.post)
    const fetchBlogs = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session_id=${sessionId}`,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "blog.post",
          method: "search_read",
          args: [[]],
          kwargs: {
            fields: ["id", "name", "subtitle", "content"],
            limit: 20,
          },
        },
      }),
    });

    const blogsData = await fetchBlogs.json();

    return Response.json(blogsData.result || []);
  } catch (error) {
    console.error("Odoo Blog Fetch Error:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
