const ODOO_URL = process.env.ODOO_URL;
const ODOO_DB = process.env.ODOO_DB;
const ODOO_USER = process.env.ODOO_USER;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD;

if (!ODOO_URL || !ODOO_DB || !ODOO_USER || !ODOO_PASSWORD) {
  console.warn(
    "Missing Odoo environment variables. Please set ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASSWORD in .env.local"
  );
}

let cachedUid = null;

/**
 * Authenticate with Odoo via JSON-RPC and cache the UID.
 */
async function getUid() {
  if (cachedUid) return cachedUid;

  const payload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "common",
      method: "authenticate",
      args: [ODOO_DB, ODOO_USER, ODOO_PASSWORD, {}]
    },
    id: Date.now()
  };

  const res = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`Odoo auth HTTP error ${res.status}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(`Odoo auth error: ${JSON.stringify(data.error)}`);
  }

  if (!data.result) {
    throw new Error("Odoo auth failed – invalid credentials?");
  }

  cachedUid = data.result;
  return cachedUid;
}

/**
 * Generic JSON-RPC call to Odoo's execute_kw.
 */
async function callOdoo(model, method, args = [], kwargs = {}) {
  const uid = await getUid();

  const payload = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute_kw",
      args: [ODOO_DB, uid, ODOO_PASSWORD, model, method, args, kwargs]
    },
    id: Date.now()
  };

  const res = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`Odoo HTTP error ${res.status}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(
      `Odoo ${model}.${method} error: ${JSON.stringify(data.error)}`
    );
  }

  return data.result;
}

// ---- Product helpers ----

export async function listProducts() {
  const result = await callOdoo(
    "product.template",
    "search_read",
    [
      [],
      ["id", "name", "list_price", "default_code", "active", "image_1920" ,'description' , 'categ_id']
    ],
    {
      limit: 200,
      order: "id desc"
    }
  );
  return result;
}

export async function createProduct({ name, price, sku, imageBase64 }) {
  if (!name || price == null) {
    throw new Error("Name and Price are required");
  }

  const values = {
    name,
    list_price: Number(price),
    default_code: sku || null,
    type: "consu"
  };

  // 👉 ADD IMAGE HERE
  if (imageBase64) {
    values.image_1920 = imageBase64;
  }

  const newId = await callOdoo("product.template", "create", [[values]]);
  return newId;
}

export async function updateProduct(id, { name, price, sku, imageBase64 }) {
  const values = {};

  if (name !== undefined) values.name = name;
  if (price !== undefined) values.list_price = Number(price);
  if (sku !== undefined) values.default_code = sku || null;

  // 👉 ADD IMAGE UPDATE SUPPORT HERE
  if (imageBase64) {
    values.image_1920 = imageBase64;
  }

  if (Object.keys(values).length === 0) {
    return true;
  }

  const ok = await callOdoo("product.template", "write", [[id], values]);
  return ok;
}

export async function deleteProduct(id) {
  const ok = await callOdoo("product.template", "unlink", [[id]]);
  return ok;
}
