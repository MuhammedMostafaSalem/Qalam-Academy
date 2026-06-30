"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { courses } from "@/constants/courses";
import CourseCard from "../courses/CourseCard";

const CoursesSlider = () => {
    return (
        <div className="relative mt-16 px-16">
            {/* Prev */}
            <button className="courses-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
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
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1.1,
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
                {courses.map((course) => (
                    <SwiperSlide key={course.id}>
                        <CourseCard course={course} />
                    </SwiperSlide>
                ))}
            </Swiper>


            {/* Next */}
            <button className="courses-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                <IoIosArrowForward size={22} />
            </button>
        </div>
    )
}

export default CoursesSlider