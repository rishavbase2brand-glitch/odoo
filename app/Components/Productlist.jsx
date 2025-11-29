"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Productlist = ({ is_our_products }) => {
  const [productdata, setproductdata] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  async function loadProducts() {
    setLoadingList(true);
    setError("");

    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to load products");
      }
      setproductdata(data.products || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const visibleProducts = productdata.slice(0, visibleCount);

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 3);
  }
  console.log("http://localhost:3001/", productdata);

  return (
    <div className="bg-white">
      <div className="cus_container py-12 md:py-20 bg-white">
        <div>
          <p className="uppercase text-[11.6px] text-secondary tracking-[0.15em] mb-3">
            UNSERE MARKEN
          </p>
          <h2 className="main_title">Belgische Manufakturen</h2>
        </div>

        <div className="pt-6 md:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {is_our_products
              ? productdata.map((data, index) => (
                  <div
                    key={index}
                    className="pt-2 h-[68%] md:h-[75%] lg:h-[82%]"
                  >
                    {data.image_1920 && (
                      <Image
                        src={`data:image/png;base64,${data.image_1920}`}
                        alt="image"
                        width={1000}
                        height={500}
                        className="max-w-[400px] h-full md:min-h-[536px] object-cover  grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    )}

                    <div className="pt-[25px] flex flex-col gap-[5px]">
                      <span className="uppercase text-[11.6px] text-secondary">
                        {data.categ_id ? data.categ_id[1] : "NO Category"}
                      </span>
                      <h4 className="uppercase text-lg md:text-[20px] text-black line-clamp-1 md:line-clamp-none">
                        {data.name}
                      </h4>
                      <p
                        className="text-[12px] md:text-base text-ternary  line-clamp-3 md:line-clamp-none "
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    </div>
                  </div>
                ))
              : visibleProducts.map((data, index) => (
                  <div
                    key={index}
                    className="pt-2 h-[68%] md:h-[75%] lg:h-[82%]"
                  >
                    {data.image_1920 && (
                      <Image
                        src={`data:image/png;base64,${data.image_1920}`}
                        alt="image"
                        width={1000}
                        height={500}
                        className="max-w-[100%] h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    )}

                    <div className="pt-[25px] flex flex-col gap-[5px]">
                      <span className="uppercase text-[11.6px] text-secondary">
                        {data.categ_id ? data.categ_id[1] : "NO Category"}
                      </span>
                      <h4 className="uppercase text-lg md:text-[20px] text-black line-clamp-1 md:line-clamp-none">
                        {data.name}
                      </h4>
                      <p
                        className="text-[12px] md:text-base text-ternary  line-clamp-3 md:line-clamp-none break-words "
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    </div>
                  </div>
                ))}
          </div>
          {is_our_products
            ? null
            : visibleCount < productdata.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={handleLoadMore}
                    className="uppercase tracking-[0.15em] px-6 py-2 bg-transparent text-black border border-black rounded-none hover:bg-black hover:text-white transition-all cursor-pointer text-[12px]"
                  >
                    Load More
                  </button>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Productlist;
