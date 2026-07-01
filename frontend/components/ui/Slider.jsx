"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Slider = ({ children }) => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
                prevEl: ".prev",
                nextEl: ".next",
            }}
            loop
            speed={700}
            spaceBetween={24}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },

                640: {
                    slidesPerView: 2,
                },

                1024: {
                    slidesPerView: 3,
                },

                1280: {
                    slidesPerView: 4,
                },
            }}
        >
            {
                Array.isArray(children)
                    ? children.map((child, index) => (
                        <SwiperSlide key={index}>
                            {child}
                        </SwiperSlide>
                    ))
                    : (
                        <SwiperSlide>
                            {children}
                        </SwiperSlide>
                    )
            }
        </Swiper>
    )
}

export default Slider