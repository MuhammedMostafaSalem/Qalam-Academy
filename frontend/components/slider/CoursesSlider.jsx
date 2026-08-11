"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CourseCard from "../courses/CourseCard";
import Slider from "../ui/Slider";
import { useEffect, useState } from "react";
import { getCoursesAction } from "@/actions/courseActions";

const CoursesSlider = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCoursesAction("isPublished=true&limit=10").then((result) => {
            if (result.success) setCourses(result.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                جاري تحميل الكورسات...
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="py-10 text-center text-text-muted">
                لا توجد كورسات متاحة حالياً
            </div>
        );
    }

    return (
        <Slider
            ButtonPrev={
                <button className="courses-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowBack size={22} />
                </button>
            }
            ButtonNext={
                <button className="courses-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowForward size={22} />
                </button>
            }
            prevEl=".courses-prev"
            nextEl=".courses-next"
        >
            {courses.map((course) => (
                <CourseCard
                    key={course._id}
                    course={{
                        image: course.thumbnail,
                        title: course.title?.ar || course.title,
                        slug: course.slug,
                        duration: course.duration || "—",
                        lessons: course.lessonsCount || 0,
                        price: course.discountPrice || course.price || 0,
                        originalPrice: course.discountPrice ? course.price : null,
                        badge: course.discountPrice ? "خصم" : null,
                        instructor: course.instructor
                            ? `${course.instructor.firstName} ${course.instructor.lastName}`
                            : "—",
                        rating: course.averageRating || 0,
                        reviewsCount: course.reviewsCount || 0,
                    }}
                />
            ))}
        </Slider>
    );
};

export default CoursesSlider;