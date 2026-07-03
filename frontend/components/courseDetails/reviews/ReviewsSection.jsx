import Section from "@/components/sections/Section"
import Container from "@/components/ui/Container"
import ReviewSummary from "./ReviewSummary";
import ReviewsList from "./ReviewsList";

const ReviewsSection = () => {
    return (
        <Section className="py-20">
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold">
                        آراء الطلاب
                    </h2>

                    <p className="mt-3 max-w-2xl leading-8 text-text-secondary">
                        اكتشف تجارب طلابنا الذين أكملوا هذا الكورس وشاركوا
                        تقييماتهم وانطباعاتهم.
                    </p>
                </div>

                <ReviewSummary />

                <ReviewsList />
            </Container>
        </Section>
    );
};

export default ReviewsSection;