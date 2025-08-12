import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MenuCard from "./MenuCard";

const MenuCarousel = ({ items, activeTab }) => {
  const loopEnabled = items.length > 3; // conditionally enable loop

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      loop={loopEnabled}
    //   autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 1 },
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <MenuCard item={item} activeTab={activeTab}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MenuCarousel;

