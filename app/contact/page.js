"use client";

import { useState } from "react";

export default function ContactPage() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      setMsg("Message sent and saved in Odoo!");
    } else {
      setMsg("Something went wrong!");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Your Name" required className="border p-2" />
        <input name="email" type="email" placeholder="Your Email" required className="border p-2" />
        <input name="phone" placeholder="Phone Number" className="border p-2" />
        <textarea name="message" placeholder="Message" required className="border p-2"></textarea>

        <button type="submit" className="bg-black text-white py-2">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
