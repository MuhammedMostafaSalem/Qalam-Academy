"use client";

import JourneyForm from "@/components/dashboard/journey/JourneyForm";
import JourneyTimelineManager from "@/components/dashboard/journey/JourneyTimelineManager";
import PageHeader from "@/components/dashboard/PageHeader";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AdminJourneyClientView() {
    const { language } = useLanguage();
    const isEnglish = language === "en";

    return (
        <div className="glass rounded-3xl border border-border p-6 shadow-sm">
            <PageHeader
                title={isEnglish ? "Our Journey" : "رحلتنا"}
                description={isEnglish ? "Manage the journey section shown on the About page" : "إدارة قسم الرحلة المعروض في صفحة من نحن"}
            />
            <JourneyForm />
            <JourneyTimelineManager />
        </div>
    );
}
