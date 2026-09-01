"use client";

import { useState } from "react";
import CourseHeader from "@/components/dashboard/course-management/CourseHeader";
import CourseTabs from "@/components/dashboard/course-management/CourseTabs";
import Section from "@/components/sections/Section";
import Info from "@/components/dashboard/course-management/info/Info";
import Students from "@/components/dashboard/course-management/students/Students";
import Reviews from "@/components/dashboard/course-management/reviews/Reviews";
import Lesson from "@/components/dashboard/course-management/lessons/Lesson";

const CourseLayout = ({ courseId, courseSlug }) => {
    const [activeTab, setActiveTab] = useState("lessons");

    const tabComponents = {
        lessons: <Lesson courseId={courseId} courseSlug={courseSlug} />,
        info: <Info courseId={courseId} />,
        students: <Students courseId={courseId} />,
        reviews: <Reviews courseId={courseId} />,
    };

    return (
        <Section className="space-y-6">
            <CourseHeader courseId={courseId} courseSlug={courseSlug} />

            <CourseTabs
                courseId={courseId}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div
                className="
                    glass
                    rounded-3xl
                    border
                    border-border
                    p-6
                    shadow-sm
                "
            >
                {tabComponents[activeTab]}
            </div>
        </Section>
    );
};

export default CourseLayout;
