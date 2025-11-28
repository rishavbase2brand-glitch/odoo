import { NextResponse } from "next/server";
import { listProducts, createProduct } from "../../lib/odoo";

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json({ ok: true, products });
  } catch (err) {
    console.error("GET /api/products error", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, sku, imageBase64, description ,categ_id } = body; // 👉 IMAGE ADDED HERE

    if (!name || price == null) {
      return NextResponse.json(
        { ok: false, error: "Name and price are required" },
        { status: 400 }
      );
    }

    // 👉 Pass image also
    const id = await createProduct({ name, price, sku, imageBase64 ,description ,categ_id});

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("POST /api/products error", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
  