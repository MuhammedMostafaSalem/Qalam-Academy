"use client";

import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import InstructorInfo from "./InstructorInfo";
import InstructorStats from "./InstructorStats";
import { useLanguage } from "@/providers/LanguageProvider";

const InstructorSection = ({ course }) => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const instructor = course?.instructor;

    if (!instructor) {
        return null;
    }

    return (
        <Section>
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold">
                        {isEn ? "Meet the Instructor" : "تعرف على المدرب"}
                    </h2>

                    <p className="mt-3 max-w-2xl text-text-secondary leading-8">
                        {isEn
                            ? "Learn from industry experts with extensive real-world experience building scalable software solutions with top local and international companies."
                            : "تعلم من أحد الخبراء الذين يمتلكون سنوات من الخبرة العملية في تطوير البرمجيات والعمل مع شركات محلية وعالمية."}
                    </p>
                </div>

                <div
                    className="
                        grid
                        gap-10
                        lg:grid-cols-[320px_1fr]
                        items-start
                    "
                >
                    <InstructorInfo instructor={instructor} />

                    <InstructorStats instructor={instructor} />
                </div>
            </Container>
        </Section>
    );
};

export default InstructorSection;