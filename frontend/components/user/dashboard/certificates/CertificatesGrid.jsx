"use client";

import CertificateCard from '@/components/ui/CertificateCard';
import useMyCourses from '@/hooks/enrollments/useMyCourses';
import { useLanguage } from '@/providers/LanguageProvider';
import { useAuth } from '@/providers/AuthProvider';

const CertificatesGrid = () => {
    const { language, localize } = useLanguage();
    const { user } = useAuth();
    const { courses, loading, error } = useMyCourses();

    if (loading) {
        return (
            <div className="py-12 text-center text-text-secondary">
                {language === "en" ? "Loading certificates..." : "جاري تحميل الشهادات..."}
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center text-error">
                {error}
            </div>
        );
    }

    // Completed courses (100% progress or completed)
    const completedCourses = (courses || []).filter(
        (enrollment) => enrollment.progress >= 100 || enrollment.isCompleted
    );

    if (completedCourses.length === 0) {
        return (
            <div className="py-12 text-center text-text-muted glass rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-lg font-bold text-text-primary mb-2">
                    {language === "en" ? "No certificates available yet" : "لا توجد شهادات متاحة حالياً"}
                </p>
                <p className="text-sm text-text-secondary">
                    {language === "en"
                        ? "Complete 100% of a course to receive your official completion certificate."
                        : "أكمل 100% من أحد الكورسات للحصول على شهادة التخرج الرسمية."}
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {completedCourses.map((enrollment, index) => {
                    const fallbackTitle = language === "en" ? "Course Completion Certificate" : "شهادة إتمام كورس";
                    const courseTitle = localize(enrollment.course?.title, fallbackTitle);

                    const dateLocale = language === "en" ? "en-US" : "ar-EG";
                    const dateStr = enrollment.updatedAt || enrollment.createdAt
                        ? new Date(enrollment.updatedAt || enrollment.createdAt).toLocaleDateString(dateLocale)
                        : "—";

                    const defaultInstructor = language === "en" ? "Qalam Academy" : "أكاديمية قلم";

                    return (
                        <CertificateCard
                            key={enrollment._id || index}
                            certificate={{
                                id: enrollment._id,
                                title: courseTitle,
                                instructor: enrollment.course?.instructor
                                    ? `${enrollment.course.instructor.firstName || ''} ${enrollment.course.instructor.lastName || ''}`.trim()
                                    : defaultInstructor,
                                date: dateStr,
                                image: enrollment.course?.thumbnail,
                                student: user
                                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                                    : "",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CertificatesGrid;
