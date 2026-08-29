"use client";

import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TestimonialCard from "../home/testimonials/TestimonialCard";
import Slider from '@/components/ui/Slider';
import { getReviewsAction } from "@/actions/reviewActions";
import { useLanguage } from "@/providers/LanguageProvider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const TestimonialsSlider = () => {
    const { language } = useLanguage();
    const [testimonialsList, setTestimonialsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await getReviewsAction("limit=10");
                if (res.success && Array.isArray(res.data)) {
                    const defaultStudentName = language === "en" ? "Academy Student" : "طالب بالأكاديمية";
                    const formatted = res.data.map((r) => ({
                        review: r.comment || "",
                        rating: r.rating || 5,
                        name: r.user ? `${r.user.firstName || ''} ${r.user.lastName || ''}`.trim() : defaultStudentName,
                        position: r.course?.title || defaultStudentName,
                        avatar: r.user?.avatar ? (r.user.avatar.startsWith("http") ? r.user.avatar : `${BASE_URL}${r.user.avatar}`) : "/assets/user-icon.png",
                    }));
                    setTestimonialsList(formatted);
                } else setError(res.message);
            } catch (err) {
                setError(err?.message || "Failed to fetch testimonials");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [language]);

    if (loading) {
        return (
            <div className="py-12 text-center text-text-secondary">
                {language === "en" ? "Loading testimonials..." : "جاري تحميل آراء الطلاب..."}
            </div>
        );
    }

    if (error) return <div className="py-12 text-center text-error">{error}</div>;

    if (testimonialsList.length === 0) {
        return (
            <div className="py-12 text-center text-text-muted">
                {language === "en" ? "No student reviews available yet" : "لا توجد آراء طلاب متاحة حتى الآن"}
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
            {testimonialsList.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                />
            ))}
        </Slider>
    );
};

export default TestimonialsSlider;
