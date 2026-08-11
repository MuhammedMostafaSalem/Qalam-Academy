"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import LoadMore from "@/components/shared/LoadMore";
import useEnrollments from "@/hooks/enrollments/useEnrollments";

const EnrollmentsTable = () => {
    const { enrollments, loading, error, meta } = useEnrollments();

    const titleHead = [
        "المشترك",
        "الكورس",
        "تاريخ الاشتراك",
        "الإجراءات",
    ];

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري التحميل...</p>
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

    if (!enrollments || enrollments.length === 0) {
        return (
            <div className="mt-[20px] text-center py-10">
                <div className="text-center py-6 text-text-muted">لا يوجد بيانات متاحة</div>
            </div>
        );
    }

    return (
        <div className="mt-[20px]">
            <div className="overflow-x-auto overflow-y-hidden">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            {titleHead.map((title, index) => (
                                <Table.Th key={index}>{title}</Table.Th>
                            ))}
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {enrollments.map((enrollment) => (
                            <Table.Row key={enrollment._id}>
                                <Table.Td>
                                    <CardTable
                                        data={{
                                            id: enrollment._id,
                                            image: enrollment.user?.avatar,
                                            name: enrollment.user?.firstName
                                                ? `${enrollment.user.firstName} ${enrollment.user.lastName || ""}`.trim()
                                                : enrollment.user?.email || "غير محدد",
                                            description: enrollment.user?.email,
                                        }}
                                    />
                                </Table.Td>

                                <Table.Td>
                                    {enrollment.course?.title?.ar || enrollment.course?.title || "غير محدد"}
                                </Table.Td>

                                <Table.Td>
                                    {enrollment.createdAt
                                        ? new Date(enrollment.createdAt).toLocaleDateString("ar-EG")
                                        : "—"}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                {/* No delete action for enrollments */}
                                            </div>
                                        }
                                    />
                                </Table.Td>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {meta && meta.hasMore && <LoadMore />}
        </div>
    );
};

export default EnrollmentsTable;