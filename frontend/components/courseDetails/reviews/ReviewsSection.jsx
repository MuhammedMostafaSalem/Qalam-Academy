import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import ReviewSummary from "./ReviewSummary";
import ReviewsList from "./ReviewsList";

const ReviewsSection = ({ course }) => {
    const reviewsCount = course?.reviewsCount || 0;
    const averageRating = course?.averageRating || 0;

    return (
        <Section>
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold">
                        آراء الطلاب
                    </h2>

                    <p className="mt-3 max-w-2xl leading-8 text-text-secondary">
                        اكتشف تجارب طلابنا الذين أكملوا هذا الكورس وشاركوا
                        تقييماتهم وانطباعاتهم. ({reviewsCount} تقييم)
                    </p>
                </div>

                <ReviewSummary course={course} />

                <ReviewsList courseId={course?._id} />
            </Container>
        </Section>
    );
};

export default ReviewsSection;