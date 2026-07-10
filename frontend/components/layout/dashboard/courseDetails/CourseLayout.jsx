"use client";

import { useState } from "react";
import CourseHeader from "@/components/dashboard/course-management/CourseHeader";
import CourseTabs from "@/components/dashboard/course-management/CourseTabs";
import Section from "@/components/sections/Section";
import Info from "@/components/dashboard/course-management/info/Info";
import Students from "@/components/dashboard/course-management/students/Students";
import Reviews from "@/components/dashboard/course-management/reviews/Reviews";
import Lesson from "@/components/dashboard/course-management/lessons/Lesson";

const CourseLayout = ({ courseId }) => {
    const [activeTab, setActiveTab] = useState("lessons");

    const tabComponents = {
        lessons: <Lesson />,
        info: <Info />,
        students: <Students />,
        reviews: <Reviews />,
    };

    return (
        <Section className="space-y-6">
            <CourseHeader courseId={courseId} />

            <CourseTabs
                courseId={courseId}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {/* {
                activeTab === "lessons" &&
            } */}
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

                {/* <Lesson courseId={courseId} /> */}
                {tabComponents[activeTab]}
            </div>
            {
                activeTab === "info" &&
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
                    <Info />
                </div>
            }

            {/* {
                activeTab === "students" &&
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
                    <Students />
                </div>
            } */}

            {/* {
                activeTab === "reviews" &&
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
                    <Reviews />
                </div>
            } */}
        </Section>
    )
}

export default CourseLayout