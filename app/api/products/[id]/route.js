import { NextResponse } from "next/server";
import { updateProduct, deleteProduct } from "@/lib/odoo";

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const { name, price, sku } = body;

    const ok = await updateProduct(id, { name, price, sku });

    return NextResponse.json({ ok });
  } catch (err) {
    console.error("PUT /api/products/[id] error", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const ok = await deleteProduct(id);
    return NextResponse.json({ ok });
  } catch (err) {
    console.error("DELETE /api/products/[id] error", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
