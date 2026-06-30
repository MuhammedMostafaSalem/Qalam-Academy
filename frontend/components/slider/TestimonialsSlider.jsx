"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { testimonials } from "@/constants/testimonials";
import TestimonialCard from "../home/testimonials/TestimonialCard";

const TestimonialsSlider = () => {
    return (
        <div className="relative px-16">
            {/* Prev */}
            <button className="courses-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 p-3">
                <IoIosArrowBack size={22} />
            </button>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: ".courses-prev",
                    nextEl: ".courses-next",
                }}
                loop
                speed={700}
                spaceBetween={24}
                autoplay={{
                    delay: 4000,
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
                }}
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                        <TestimonialCard
                            testimonial={testimonial}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Next */}
            <button className="courses-next absolute right-0 top-1/2 z-10 -translate-y-1/2 p-3">
                <IoIosArrowForward size={22} />
            </button>
        </div>
    )
}

export default TestimonialsSlider