"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("consu"); // default
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject(err);
    });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Name and price are required");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type,
          list_price: Number(price),
          stock: Number(stock || 0),
          description_sale: description,
          image_1920: image,
          uom_id: 1,   // default UOM
          categ_id: 1  // default Category
        }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Error creating product: " + data.error);
        return;
      }

      setName("");
      setType("consu");
      setPrice("");
      setStock("");
      setDescription("");
      setImage(null);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 16 }}>Products</h1>

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px 18px",
          background: "#111",
          color: "white",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        + Add Product
      </button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: 420,
              background: "white",
              padding: 20,
              borderRadius: 10,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ marginBottom: 16 }}>Add Product</h2>

            <form
              onSubmit={handleAddProduct}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <input
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: 8 }}
                required
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ padding: 8 }}
              >
                <option value="product">Stockable Product</option>
                <option value="consu">Consumable Product</option>
                <option value="service">Service Product</option>
              </select>

              <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ padding: 8 }}
                required
              />

              <input
                placeholder="Stock quantity"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={{ padding: 8 }}
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ padding: 8 }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base = await convertToBase64(file);
                    setImage(base);
                  }
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "8px 14px",
                    background: "#ccc",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: "8px 14px",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "grid", gap: 15 }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              {p.image_1920 && (
                <Image
                  src={`data:image/jpeg;base64,${p.image_1920}`}
                  alt={p.name}
                  width={80}
                  height={80}
                  style={{ borderRadius: 6, objectFit: "cover" }}
                />
              )}

              <div>
                <h3 style={{ margin: 0 }}>{p.name}</h3>
                <p style={{ margin: "4px 0" }}>₹ {p.list_price}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
                  Stock: {p.qty_available || stock}
                </p>
                {p.description_sale && (
                  <p style={{ marginTop: 6, fontSize: 13 }}>{p.description_sale}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
