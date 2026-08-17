"use client";

import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { testimonials as fallbackTestimonials } from "@/constants/testimonials";
import TestimonialCard from "../home/testimonials/TestimonialCard";
import Slider from '@/components/ui/Slider';
import { getReviewsAction } from "@/actions/reviewActions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const TestimonialsSlider = () => {
    const [testimonialsList, setTestimonialsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await getReviewsAction("limit=10");
                if (res.success && Array.isArray(res.data) && res.data.length > 0) {
                    const formatted = res.data.map((r) => ({
                        review: r.comment || "",
                        rating: r.rating || 5,
                        name: r.user ? `${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() : "طالب بالأكاديمية",
                        position: typeof r.course?.title === "object" ? (r.course.title.ar || r.course.title.en) : r.course?.title || "طالب الأكاديمية",
                        avatar: r.user?.avatar ? (r.user.avatar.startsWith("http") ? r.user.avatar : `${BASE_URL}${r.user.avatar}`) : "/assets/user-icon.png",
                    }));
                    setTestimonialsList(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch testimonials API", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const displayTestimonials = testimonialsList.length > 0 ? testimonialsList : fallbackTestimonials;

    if (loading) {
        return (
            <div className="py-12 text-center text-white/60">
                جاري تحميل آراء الطلاب...
            </div>
        );
    }

    return (
        <Slider
            ButtonPrev={
                <button className="testi-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 p-3">
                    <IoIosArrowBack size={22} />
                </button>
            }
            ButtonNext={
                <button className="testi-next absolute right-0 top-1/2 z-10 -translate-y-1/2 p-3">
                    <IoIosArrowForward size={22} />
                </button>
            }
            prevEl=".testi-prev"
            nextEl=".testi-next"
        >
            {displayTestimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                />
            ))}
        </Slider>
    );
};

export default TestimonialsSlider;