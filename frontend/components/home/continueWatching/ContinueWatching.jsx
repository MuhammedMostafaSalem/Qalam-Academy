"use client";

import { useEffect, useState } from "react";
import Section from "@/components/sections/Section";
import Container from "@/components/ui/Container";
import { getContinueWatchingAction } from "@/actions/progressActions";
import ContinueWatchingCard from "./ContinueWatchingCard";
import { fadeUp } from "@/lib/animationHelpers";
import { useLanguage } from "@/providers/LanguageProvider";

const ContinueWatching = () => {
    const { language } = useLanguage();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContinueWatching = async () => {
            try {
                const result = await getContinueWatchingAction();
                if (result.success && result.data) {
                    setCourses(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch continue watching:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContinueWatching();
    }, []);

    // Don't show section if no courses or still loading
    if (loading || !courses || courses.length === 0) {
        return null;
    }

    return (
        <Section className="py-20">
            <Container>
                <div {...fadeUp()} className="mb-12">
                    <h2 className="text-3xl font-bold md:text-4xl">
                        {language === "en" ? "Continue Learning" : "تابع التعلّم"}
                    </h2>
                    <p className="mt-3 text-text-secondary">
                        {language === "en"
                            ? "Resume your lessons and keep moving toward your learning goals."
                            : "استكمل الدروس التي بدأتها وواصل التقدم نحو أهدافك التعليمية."}
                    </p>
                </div>

                <div
                    {...fadeUp()}
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {courses.map((course, index) => (
                        <ContinueWatchingCard
                            key={course._id}
                            course={course}
                            index={index}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ContinueWatching;
