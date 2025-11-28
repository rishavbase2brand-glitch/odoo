"use client";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.log("Invalid data:", data);
        }
      } catch (e) {
        console.log("Fetch Error:", e);
      }
      setLoading(false);
    }

    loadBlogs();
  }, []);

  if (loading) return <p className="p-10 text-xl">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border p-5 rounded-lg mb-6 flex flex-col md:flex-row gap-4 items-start"
        >
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.name}
              className="w-full md:w-48 h-32 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{blog.name}</h2>
            <p className="text-gray-500">{blog.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
