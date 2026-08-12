"use client";

import Table from "@/components/ui/Table";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import ActionsTable from "@/components/shared/ActionsTable";
import LoadMore from "@/components/shared/LoadMore";
import CardTable from "@/components/shared/CardTable";
import Link from "next/link";
import useCourses from "@/hooks/courses/useCourses";
import { useState } from "react";
import { deleteCourseAction } from "@/actions/courseActions";
import useToast from "@/hooks/useToast";
import { useSearchParams } from "next/navigation";

const CoursesTable = () => {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const { courses, loading, error, meta, refetch } = useCourses(queryString);
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    const titleHead = [
        "الكورس",
        "المدرب",
        "التصنيف",
        "المستوى",
        "السعر",
        "تاريخ الاضافة",
        "الإجراءات",
    ];

    const handleDelete = async (courseId) => {
        if (!confirm("هل أنت متأكد من حذف هذا الكورس؟")) return;

        setDeletingId(courseId);
        const result = await deleteCourseAction(courseId);

        if (result.success) {
            successMessage(result.message || "تم حذف الكورس بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف الكورس");
        }

        setDeletingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري تحميل الكورسات...</p>
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

    if (!courses || courses.length === 0) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">لا توجد كورسات متاحة</p>
            </div>
        );
    }

    return (
        <div className="mt-[20px]">
            <Table>
                <Table.Head>
                    <Table.Row>
                        {titleHead.map((title, index) => (
                            <Table.Th key={index}>{title}</Table.Th>
                        ))}
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {courses.map((course) => (
                        <Table.Row key={course._id}>
                            <Table.Td>
                                <Link href={`/dashboard/courses/${course._id}`}>
                                    <CardTable
                                        data={{
                                            id: course._id,
                                            image: course.thumbnail,
                                            name: course.title?.ar || course.title,
                                            description: course.description?.ar || course.description,
                                        }}
                                    />
                                </Link>
                            </Table.Td>

                            <Table.Td>
                                {course.instructor?.firstName || "غير محدد"}
                            </Table.Td>

                            <Table.Td>
                                {course.category?.title?.ar || course.category || "غير مصنف"}
                            </Table.Td>

                            <Table.Td>
                                {course.level === "beginner" && "مبتدئ"}
                                {course.level === "intermediate" && "متوسط"}
                                {course.level === "advanced" && "متقدم"}
                            </Table.Td>

                            <Table.Td>
                                {course.discountPrice > 0 ? (
                                    <div className="flex flex-col">
                                        <span className="text-primary font-bold">
                                            {course.discountPrice} ج.م
                                        </span>
                                        <span className="text-text-muted text-sm line-through">
                                            {course.price} ج.م
                                        </span>
                                    </div>
                                ) : (
                                    <span>{course.price} ج.م</span>
                                )}
                            </Table.Td>

                            <Table.Td>
                                {new Date(course.createdAt).toLocaleDateString("ar-EG")}
                            </Table.Td>

                            <Table.Td>
                                <ActionsTable
                                    actions={
                                        <div className="flex gap-3 justify-center items-center text-[20px]">
                                            <Link
                                                href={`/dashboard/courses/edit/${course._id}`}
                                                className="text-primary cursor-pointer"
                                            >
                                                <MdOutlineEdit />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(course._id)}
                                                disabled={deletingId === course._id}
                                                className="text-error cursor-pointer disabled:opacity-50"
                                                type="button"
                                            >
                                                <MdOutlineDelete />
                                            </button>
                                        </div>
                                    }
                                />
                            </Table.Td>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {meta && meta.hasMore && <LoadMore />}
        </div>
    );
};

export default CoursesTable;