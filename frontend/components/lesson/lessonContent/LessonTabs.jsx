"use client";

import { useState } from "react";
import ResourcesTab from "./ResourcesTab";
import OverviewTab from "./OverviewTab";

const tabs = [
    {
        id: "overview",
        label: "نظرة عامة",
    },
    {
        id: "resources",
        label: "المرفقات",
    },
];

const LessonTabs = ({ lesson }) => {
    const [activeTab, setActiveTab] = useState("overview");

    const renderTab = () => {
        switch (activeTab) {
            case "resources":
                return <ResourcesTab lesson={lesson} />;

            default:
                return <OverviewTab lesson={lesson} />;
        }
    };

    return (
        <section>
            {/* Tabs */}
            <div
                className="
                    mb-8
                    flex
                    flex-wrap
                    gap-3
                    border-b
                    border-border
                    pb-4
                "
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            rounded-full
                            px-5
                            py-2
                            text-sm
                            font-medium
                            transition-all
                            duration-300

                            ${activeTab === tab.id
                                ? "bg-primary text-white"
                                : "bg-card text-text-secondary hover:bg-primary/10 hover:text-primary"
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div
                className="
                    rounded-3xl
                    border
                    border-border
                    bg-card
                    p-8
                "
            >
                {renderTab()}
            </div>
        </section>
    );
};

export default LessonTabs;