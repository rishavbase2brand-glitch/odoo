"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  console.log(products,"djd")
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      {products.map((data) => (
        <Link 
          href={`/product/${data.id}`} 
          key={data.id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div style={{ marginBottom: 20, border: "1px solid #ddd", padding: 10 }}>
            <h3>{data.name}</h3>
            <p> ${data.list_price}</p>
            {data.image_1920 && (
              <Image
                src={`data:image/jpeg;base64,${data.image_1920}`}
                alt={data.name}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        </Link>
        
      ))}
    </div>
   
  );
}
