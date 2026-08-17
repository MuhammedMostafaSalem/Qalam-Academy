"use client";

import { useEffect, useState } from "react";
import SectionBadge from "@/components/sections/SectionBadge";
import SectionTitle from "@/components/sections/SectionTitle";
import SectionDescription from "@/components/sections/SectionDescription";
import { getJourneyAction } from "@/actions/journeyActions";

const StoryContent = () => {
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
    }, []);

    const title = journey?.title?.ar || journey?.title?.en || journey?.title;
    const badgeText = journey?.badgeText?.ar || journey?.badgeText?.en || journey?.badgeText || "قصتنا";
    const description = journey?.description?.ar || journey?.description?.en || journey?.description;

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
                            <div>رحلة بدأت بشغف</div>
                            <div>وأصبحت رسالة</div>
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
                            بدأت رحلة قلم أكاديمي من شغف حقيقي بالتقنية والتعليم
                            ورغبة في تقديم تجربة تعلم حديثة تساعد الطلاب
                            والمطورين على اكتساب المهارات المطلوبة لسوق العمل
                            بطريقة عملية واحترافية.
                        </SectionDescription>

                        <SectionDescription>
                            لم يكن هدفنا تقديم دورات تعليمية فقط، بل بناء مجتمع
                            تقني يشارك المعرفة ويشجع على الابتكار والتطوير
                            المستمر، لذلك نحرص على توفير محتوى عالي الجودة
                            وتجربة تعليمية متكاملة.
                        </SectionDescription>

                        <SectionDescription>
                            نؤمن أن النجاح الحقيقي يبدأ من الاستثمار في الإنسان،
                            ولهذا نعمل يوميًا على تمكين طلابنا من بناء مستقبلهم
                            المهني بثقة، من خلال التعلم العملي والإرشاد المستمر.
                        </SectionDescription>
                    </>
                )}
            </div>
        </div>
    );
};

export default StoryContent;