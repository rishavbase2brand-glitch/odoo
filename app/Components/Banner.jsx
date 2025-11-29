"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FadeSlider() {
  const images = [
    "/images/bannerslider1.webp",
    "/images/article-home-2.png", // second image — change if needed
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-full h-[75vh] overflow-hidden">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt="banner"
          fill
          className={`absolute inset-0 object-cover transition-opacity duration-1000 md:grayscale md:hover:grayscale-0 transition-all duration-500
            ${index === i ? "opacity-100" : "opacity-0"}`  }
        />
      ))}
    </div>
  );
}
