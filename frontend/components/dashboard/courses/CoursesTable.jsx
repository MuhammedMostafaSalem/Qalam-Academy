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

import { useAuth } from "@/providers/AuthProvider";

import { useLanguage } from "@/providers/LanguageProvider";

const CoursesTable = () => {
    const { language, localize } = useLanguage();
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const { courses, loading, error, meta, refetch } = useCourses(queryString);
    const { user } = useAuth();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    const isInstructor = user?.role === "instructor";
    const filteredCourses = isInstructor && user?._id
        ? courses.filter(
              (course) =>
                  (course.instructor?._id || course.instructor) === user._id ||
                  (course.createdBy?._id || course.createdBy) === user._id
          )
        : courses;

    const titleHead = language === "en" ? [
        "Course",
        "Instructor",
        "Category",
        "Level",
        "Price",
        "Date Added",
        "Actions",
    ] : [
        "الكورس",
        "المدرب",
        "التصنيف",
        "المستوى",
        "السعر",
        "تاريخ الاضافة",
        "الإجراءات",
    ];

    const handleDelete = async (courseId) => {
        if (!confirm(language === "en" ? "Are you sure you want to delete this course?" : "هل أنت متأكد من حذف هذا الكورس؟")) return;

        setDeletingId(courseId);
        const result = await deleteCourseAction(courseId);

        if (result.success) {
            successMessage(result.message || (language === "en" ? "Course deleted successfully" : "تم حذف الكورس بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (language === "en" ? "Failed to delete course" : "فشل حذف الكورس"));
        }

        setDeletingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">
                    {language === "en" ? "Loading courses..." : "جاري تحميل الكورسات..."}
                </p>
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

    if (!filteredCourses || filteredCourses.length === 0) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">
                    {language === "en" ? "No courses available" : "لا توجد كورسات متاحة"}
                </p>
            </div>
        );
    }

    const currencyText = language === "en" ? "EGP" : "ج.م";

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
                    {filteredCourses.map((course) => (
                        <Table.Row key={course._id}>
                            <Table.Td>
                                <Link href={`/dashboard/courses/${course._id}`}>
                                    <CardTable
                                        data={{
                                            id: course._id,
                                            image: course.thumbnail,
                                            name: localize(course.title),
                                            description: localize(course.description),
                                        }}
                                    />
                                </Link>
                            </Table.Td>

                            <Table.Td>
                                {course.instructor?.firstName
                                    ? `${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`.trim()
                                    : (language === "en" ? "Unassigned" : "غير محدد")}
                            </Table.Td>

                            <Table.Td>
                                {localize(course.category?.title || course.category?.name || course.category, language === "en" ? "Uncategorized" : "غير مصنف")}
                            </Table.Td>

                            <Table.Td>
                                {course.level === "beginner" && (language === "en" ? "Beginner" : "مبتدئ")}
                                {course.level === "intermediate" && (language === "en" ? "Intermediate" : "متوسط")}
                                {course.level === "advanced" && (language === "en" ? "Advanced" : "متقدم")}
                            </Table.Td>

                            <Table.Td>
                                {course.discountPrice > 0 ? (
                                    <div className="flex flex-col">
                                        <span className="text-primary font-bold">
                                            {course.discountPrice} {currencyText}
                                        </span>
                                        <span className="text-text-muted text-sm line-through">
                                            {course.price} {currencyText}
                                        </span>
                                    </div>
                                ) : (
                                    <span>{course.price} {currencyText}</span>
                                )}
                            </Table.Td>

                            <Table.Td>
                                {new Date(course.createdAt).toLocaleDateString(language === "en" ? "en-US" : "ar-EG")}
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