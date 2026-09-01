"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import LoadMore from "@/components/shared/LoadMore";
import useEnrollments from "@/hooks/enrollments/useEnrollments";
import { useLanguage } from "@/providers/LanguageProvider";

const EnrollmentsTable = () => {
    const { localize, language } = useLanguage();
    const isEn = language === "en";
    const { enrollments, loading, error, meta } = useEnrollments();

    const titleHead = isEn ? [
        "Subscriber",
        "Course",
        "Enrollment Date",
    ] : [
        "المشترك",
        "الكورس",
        "تاريخ الاشتراك",
    ];

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">{isEn ? "Loading enrollments..." : "جاري التحميل..."}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-error">{error}</p>
            </div>
        );
    }

    return (
        <div className="mt-[20px]">
            <div className="overflow-x-auto min-h-[250px] pb-10">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            {titleHead.map((title, index) => (
                                <Table.Th key={index}>{title}</Table.Th>
                            ))}
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {!enrollments || enrollments.length === 0 ? (
                            <Table.Row>
                                <Table.Td colSpan={4}>
                                    <div className="text-center py-6 text-text-muted">
                                        {isEn ? "No enrollments available" : "لا يوجد بيانات متاحة"}
                                    </div>
                                </Table.Td>
                            </Table.Row>
                        ) : (
                            enrollments.map((enrollment) => (
                                <Table.Row key={enrollment._id}>
                                    <Table.Td>
                                        <CardTable
                                            data={{
                                                id: enrollment._id,
                                                image: enrollment.user?.avatar,
                                                name: enrollment.user?.firstName
                                                    ? `${enrollment.user.firstName} ${enrollment.user.lastName || ""}`.trim()
                                                    : enrollment.user?.email || (isEn ? "Unspecified" : "غير محدد"),
                                                description: enrollment.user?.email,
                                            }}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        {localize(enrollment.course?.title, isEn ? "Unspecified" : "غير محدد")}
                                    </Table.Td>

                                    <Table.Td>
                                        {enrollment.createdAt
                                            ? new Date(enrollment.createdAt).toLocaleDateString(language === "en" ? "en-US" : "ar-EG")
                                            : "—"}
                                    </Table.Td>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </div>

            {meta && meta.hasMore && <LoadMore />}
        </div>
    );
};

export default EnrollmentsTable;