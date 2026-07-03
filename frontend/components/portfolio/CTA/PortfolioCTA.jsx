import Container from "@/components/ui/Container";
import Section from "@/components/sections/Section";
import CTAButtons from "./CTAButtons";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";

const PortfolioCTA = () => {
    return (
        <Section>
            <Container>
                <div
                    className="
                        rounded-[32px]
                        border
                        border-border
                        bg-gradient-to-br
                        from-primary/10
                        via-card
                        to-secondary/10
                        px-8
                        py-20
                        text-center
                    "
                >
                    <h2
                        {...heroAnimation.title}
                        className={`
                            text-4xl
                            font-bold
                            ${animations.transition}
                        `}
                    >
                        هل لديك فكرة مشروع؟
                    </h2>

                    <p
                        {...heroAnimation.description}
                        className={`
                            mx-auto
                            mt-6
                            max-w-2xl
                            leading-8
                            text-text-secondary
                            ${animations.transition}
                        `}
                    >
                        فريقنا جاهز لتحويل فكرتك إلى منتج رقمي احترافي باستخدام أحدث التقنيات وأفضل الممارسات.
                    </p>

                    <CTAButtons />
                </div>
            </Container>
        </Section>
    );
};

export default PortfolioCTA;