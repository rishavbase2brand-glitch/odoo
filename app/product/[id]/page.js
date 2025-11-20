"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ProductPage() {
  const pathname = usePathname(); // /product/sfsbu
  const slug = pathname.split("/").pop(); // sfsbu

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Your Odoo details
  const ODOO_URL = "https://test210.odoo.com";
  const SESSION_ID = "session_id=g8mwH_2z87JP8uEgGMc2kpqwX21-h9G0XU9T1W9wSeYtjS2Sb-gwo7bfq_iTpZnVv1OYsbWhuU8WiIJpLpl5";

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": `session_id=${SESSION_ID}`,
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              model: "product.product",
              method: "search_read",
              args: [
                [["default_code", "=", slug]], // Slug → default_code match  
                ["id", "name", "list_price", "description", "image_1920"],
              ],
            },
          }),
        });

        const data = await res.json();

        if (data?.result?.length > 0) {
          setProduct(data.result[0]); // First product
        }

      } catch (error) {
        console.error("Fetch Error:", error);
      }

      setLoading(false);
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <h2>Loading product...</h2>;

  if (!product)
    return <h2 style={{ color: "red" }}>Product not found: {slug}</h2>;

  // Convert Odoo base64 image
  const productImage = product.image_1920
    ? `data:image/png;base64,${product.image_1920}`
    : "/no-image.png"; // fallback image

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>

      <img
        src={productImage}
        alt={product.name}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <h2>₹ {product.list_price}</h2>

      <p>{product.description || "No description available"}</p>

      <p><b>Product Code (Slug):</b> {slug}</p>
    </div>
  );
}
