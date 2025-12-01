// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function FadeSlider() {
//   const images = [
//     "/images/bannerslider1.webp",
//     "/images/article-home-2.png", 
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 2200);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full max-w-full h-[75vh] overflow-hidden">
//       {images.map((img, i) => (
//         <Image
//           key={i}
//           src={img}
//           alt="banner"
//           fill
//           className={`absolute inset-0 object-cover transition-opacity duration-1000 grayscale hover:grayscale-0 transition-all duration-500
//             ${index === i ? "opacity-100" : "opacity-0"}`  }
//         />
//       ))}
//     </div>
//   );
// }
"use client";
import Image from "next/image";

export default function FadeSlider() {
  const images = [
    "/images/bannerslider1.webp", // sirf ye banner show hoga
  ];

  return (
    <div className="relative w-full max-w-full h-[75vh] overflow-hidden">
      <Image
        src={images[0]}
        alt="banner"
        fill
        className="absolute inset-0 object-cover grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
}
