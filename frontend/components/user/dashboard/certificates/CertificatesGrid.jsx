"use client";

import CertificateCard from '@/components/ui/CertificateCard';
import useMyCourses from '@/hooks/enrollments/useMyCourses';

const CertificatesGrid = () => {
    const { courses, loading, error } = useMyCourses();

    if (loading) {
        return (
            <div className="py-12 text-center text-text-secondary">
                جاري تحميل الشهادات...
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
                <p className="text-lg font-bold text-white mb-2">لا توجد شهادات متاحة حالياً</p>
                <p className="text-sm text-white/60">أكمل 100% من أحد الكورسات للحصول على شهادة التخرج الرسمية.</p>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {completedCourses.map((enrollment, index) => {
                    const courseTitle = typeof enrollment.course?.title === "object"
                        ? (enrollment.course.title.ar || enrollment.course.title.en)
                        : enrollment.course?.title || "شهادة إتمام كورس";

                    const dateStr = enrollment.updatedAt || enrollment.createdAt
                        ? new Date(enrollment.updatedAt || enrollment.createdAt).toLocaleDateString("ar-EG")
                        : "—";

                    return (
                        <CertificateCard
                            key={enrollment._id || index}
                            certificate={{
                                id: enrollment._id,
                                title: courseTitle,
                                instructor: enrollment.course?.instructor
                                    ? `${enrollment.course.instructor.firstName || ''} ${enrollment.course.instructor.lastName || ''}`.trim()
                                    : "أكاديمية قلم",
                                date: dateStr,
                                image: enrollment.course?.thumbnail,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CertificatesGrid;