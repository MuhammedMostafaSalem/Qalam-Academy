"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import { getJourneyAction } from "@/actions/journeyActions";

import { useLanguage } from "@/providers/LanguageProvider";

const StoryContent = () => {
    const { language, localize } = useLanguage();
    const [journey, setJourney] = useState(null);

    useEffect(() => {
        const fetchJourney = async () => {
            try {
                const res = await getJourneyAction();
                if (res.success && res.data) {
                    setJourney(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch journey data", err);
            }
        };
        fetchJourney();
    }, [language]);

    const defaultBadge = language === "en" ? "Our Story" : "قصتنا";
    const title = localize(journey?.title);
    const badgeText = localize(journey?.badge, defaultBadge);
    const description = localize(journey?.description);

    const defaultTitlePart1 = language === "en" ? "A journey that started with passion" : "رحلة بدأت بشغف";
    const defaultTitlePart2 = language === "en" ? "and became a mission" : "وأصبحت رسالة";

    const defaultDesc1 = language === "en"
        ? "The journey of Qalam Academy began from a true passion for technology and education, and a desire to deliver modern learning experiences that empower students and developers to acquire in-demand market skills practically and professionally."
        : "بدأت رحلة قلم أكاديمي من شغف حقيقي بالتقنية والتعليم ورغبة في تقديم تجربة تعلم حديثة تساعد الطلاب والمطورين على اكتساب المهارات المطلوبة لسوق العمل بطريقة عملية واحترافية.";

    const defaultDesc2 = language === "en"
        ? "Our goal was never just to offer training courses, but to build a tech community that shares knowledge and fosters continuous innovation and development."
        : "لم يكن هدفنا تقديم دورات تعليمية فقط، بل بناء مجتمع تقني يشارك المعرفة ويشجع على الابتكار والتطوير المستمر، لذلك نحرص على توفير محتوى عالي الجودة وتجربة تعليمية متكاملة.";

    const defaultDesc3 = language === "en"
        ? "We believe true success starts with investing in people. That's why we work daily to enable our students to build their careers with confidence."
        : "نؤمن أن النجاح الحقيقي يبدأ من الاستثمار في الإنسان، ولهذا نعمل يوميًا على تمكين طلابنا من بناء مستقبلهم المهني بثقة، من خلال التعلم العملي والإرشاد المستمر.";

    if (journey?.isActive === false) return null;

    return (
        <div className="max-w-xl flex flex-col items-start gap-7">
            <SectionBadge>
                {badgeText}
            </SectionBadge>

            <SectionTitle>
                <div className="text-[36px] md:text-[40px] text-start leading-[1.4]">
                    {title ? (
                        <div>{title}</div>
                    ) : (
                        <>
                            <div>{defaultTitlePart1}</div>
                            <div>{defaultTitlePart2}</div>
                        </>
                    )}
                </div>
            </SectionTitle>

            <div className="flex flex-col text-start gap-3">
                {description ? (
                    <SectionDescription>
                        {description}
                    </SectionDescription>
                ) : (
                    <>
                        <SectionDescription>
                            {defaultDesc1}
                        </SectionDescription>

                        <SectionDescription>
                            {defaultDesc2}
                        </SectionDescription>

                        <SectionDescription>
                            {defaultDesc3}
                        </SectionDescription>
                    </>
                )}
            </div>
        </div>
    );
};

export default StoryContent;
