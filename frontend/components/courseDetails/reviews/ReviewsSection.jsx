"use client";

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import ReviewSummary from "./ReviewSummary";
import ReviewsList from "./ReviewsList";
import { useLanguage } from "@/providers/LanguageProvider";

const ReviewsSection = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const reviewsCount = course?.totalReviews ?? course?.reviews?.length ?? 0;

    return (
        <Section>
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold">
                        {isEn ? "Student Reviews" : "آراء الطلاب"}
                    </h2>

                    <p className="mt-3 max-w-2xl leading-8 text-text-secondary">
                        {isEn
                            ? `Discover real experiences from students who took this course and shared their ratings and feedback (${reviewsCount} reviews).`
                            : `اكتشف تجارب طلابنا الذين أكملوا هذا الكورس وشاركوا تقييماتهم وانطباعاتهم. (${reviewsCount} تقييم)`}
                    </p>
                </div>

                <ReviewSummary course={course} />

                <ReviewsList courseId={course?._id} />
            </Container>
        </Section>
    );
};

export default ReviewsSection;
