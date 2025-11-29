"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Productlist = ({ is_our_products }) => {
  const [productdata, setproductdata] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(1);

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

  return (
    <div className="bg-[#fafafa]">
      <div className="cus_container py-20  px-[20px] py-[30px] md:px-0 md:py-20 ">
        <div>
          <p className="uppercase text-[11.6px] text-secondary tracking-[0.15em] mb-3">
            PRODUKT DES MONATS
          </p>
          <h2 className="main_title">Kuratierte Auswahl</h2>
        </div>

        <div className="pt-12">
          <div>
            {is_our_products
              ? productdata.map((data, index) => (
                  <div
                    className="grid grid-cols-2 gap-6 items-center"
                    key={index}
                  >
                    {data.image_1920 && (
                      <Image
                        src={`data:image/png;base64,${data.image_1920}`}
                        alt="image"
                        width={1000}
                        height={500}
                        className="w-full max-w-full h-[494px] object-cover md:grayscale md:hover:grayscale-0 transition-all duration-500"
                      />
                    )}

                    <div className="pt-4 max-w-[430px] ml-[36px]-4">
                      <span className="uppercase text-[11.6px] text-secondary tracking-[0.15em] mb-3">
                        {data.categ_id ? data.categ_id[1] : "NO Category"}
                      </span>
                      <h4 className="uppercase text-[clamp(1.25rem,2vw,1.75rem)] font-light tracking-[0.02em] leading-[1.2] text-black mb-6 mt-[9px]">
                        {data.name}
                      </h4>
                      <p
                        className="text-base text-ternary"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                      {is_our_products
                        ? null
                        : visibleCount < productdata.length && (
                            <div className="text-center md:mt-10 mt-6">
                              <button
                                // onClick={handleLoadMore}
                                className="px-6 py-2 bg-transparent text-black border border-black rounded-none hover:bg-gray-100 transition-all  cursor-pointer"
                              >
                                Load More
                              </button>
                            </div>
                          )}
                    </div>
                  </div>
                ))
              : visibleProducts.map((data, index) => (
                  <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
                    key={index}
                  >
                    {data.image_1920 && (
                      <Image
                        src={`data:image/png;base64,${data.image_1920}`}
                        alt="image"
                        width={1000}
                        height={500}
                        className="w-full max-w-full h-[494px] object-cover md:grayscale md:hover:grayscale-0 transition-all duration-500"
                      />
                    )}

                    <div className="md:pt-4 max-w-[430px] md:ml-[36px]">
                      <span className="uppercase text-[11.6px] text-secondary tracking-[0.15em] mb-3">
                        {data.categ_id ? data.categ_id[1] : "NO Category"}
                      </span>
                      <h4 className="t-light tracking-[0.02em] leading-[1.2] text-black mt-2.5 mb-2 text-lg md:text-[20px]">
                        {data.name}
                      </h4>
                      <p
                        className="text-[12px] md:text-base text-ternary break-words line-clamp-3 md:line-clamp-none"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                      {is_our_products
                        ? null
                        : visibleCount < productdata.length && (
                            <div className="mt-5">
                              <button className="uppercase tracking-[0.15em] px-6 py-2 bg-transparent text-black border border-black rounded-none hover:bg-black hover:text-white transition-all cursor-pointer text-[12px]">
                                Load More
                              </button>
                            </div>
                          )}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
