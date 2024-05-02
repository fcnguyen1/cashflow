import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Carousel = ({ photos_url, u_id }) => {
  // Fancybox.bind("[data-fancybox='gallery']", {});
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <style>
        {`
          .swiper-button-prev, .swiper-button-next {
            color: #fff; 
          }

          .swiper-pagination-bullet {
            background-color: #fff;
          }
        `}
      </style>
      <div>
        {photos_url.map((photoUrl, index) => {
          Fancybox.bind(`[data-fancybox='gallery-${u_id}']`, {});
          return (
            <SwiperSlide key={index}>
              <img
                src={photoUrl}
                data-fancybox={`gallery-${u_id}`}
                data-lazy-src={photoUrl}
                style={{ height: "315px", width: "100%" }}
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
};

export default Carousel;
