'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import sliderimage1 from "../../public/images/bannerslider1.webp";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
         speed={1500} 
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper  overflow-hidden"
      >
        {[sliderimage1, sliderimage1].map((data, index) => (
          <SwiperSlide key={index}>
            <Image
              src={data}
              alt={`slider image ${index + 1}`}
              width={3000}
              height={500}
              className="w-full min-h-[500px] max-h-[700px] object-cover grayscale hover:grayscale-0"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
