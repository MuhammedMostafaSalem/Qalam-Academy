"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import React from "react";

const Slider = ({
    children,
    ButtonPrev,
    ButtonNext,
    prevEl,
    nextEl
}) => {
    return (
        <div className="relative mt-16 px-16">
            {/* Prev */}
            {ButtonPrev}

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: prevEl,
                    nextEl: nextEl,
                }}
                loop={React.Children.count(children) > 4}
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

            {/* Next */}
            {ButtonNext}
        </div>
    )
}

export default Slider