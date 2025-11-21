"use client";
import { useState } from "react";

export default function AddProductPopup({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", price: "", stock: "", description: "", image: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    price: Number(form.price),
                    stock: Number(form.stock),
                    description: form.description,
                    image_1920: form.image, // base64 or leave empty
                }),
            });
            const data = await res.json();

            if (data.success) {
                alert("Product added!");
                onAdd(); // refresh parent product list
                setOpen(false);
                setForm({ name: "", price: "", stock: "", description: "", image: "" });
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to add product");
        }
        setLoading(false);
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>Add Product</button>

            {open && (
                <div className="popup">
                    <h2>Add Product</h2>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                    <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                    <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
                    <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                    <input name="image" placeholder="Image Base64" value={form.image} onChange={handleChange} />
                    <button onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                </div>
            )}
        </>
    );
}
