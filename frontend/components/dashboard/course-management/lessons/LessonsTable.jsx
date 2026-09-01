"use client";

import { useState, useEffect } from "react";
import Section from "@/components/sections/Section";
import ActionsTable from "@/components/shared/ActionsTable";
import Table from "@/components/ui/Table";
import { useParams, useRouter } from "next/navigation";
import {
    HiOutlineEye,
    HiOutlineBars3,
} from "react-icons/hi2";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { getLessonsAction, deleteLessonAction } from "@/actions/lessonActions";
import { useLanguage } from "@/providers/LanguageProvider";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";


const LessonsTable = ({ courseId, courseSlug }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const router = useRouter();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { requestDelete } = useDeleteModal();

    const fetchLessons = async () => {
        if (!courseId) return;
        setLoading(true);
        const result = await getLessonsAction(`course=${courseId}`);
        if (result.success) {
            setLessons(result.data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLessons();
    }, [courseId, language]);

    const handleDelete = async (id) => {
        const result = await deleteLessonAction(id);
        if (result.success) {
            fetchLessons();
        }
    };

    const handleDeleteRequest = (id) => {
        requestDelete({
            itemId: id,
            title: isEn ? "Delete Lesson" : "حذف الدرس",
            message: isEn ? "Are you sure you want to delete this lesson? This action cannot be undone." : "هل أنت متأكد من حذف هذا الدرس؟ لا يمكن التراجع عن هذا الإجراء.",
        });
    };

    if (loading) {
        return (
            <Section className="overflow-x-auto">
                <div className="space-y-3 p-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-12 w-full animate-pulse rounded-xl bg-border"
                        />
                    ))}
                </div>
            </Section>
        );
    }

    if (lessons.length === 0) {
        return (
            <Section className="overflow-x-auto">
                <div className="p-8 text-center text-text-secondary">
                    {isEn ? "No lessons available for this course yet." : "لا توجد دروس لهذا الكورس بعد."}
                </div>
            </Section>
        );
    }

    return (
        <Section
            className="
                overflow-x-auto
            "
        >
            <Table
                className="
                    w-full
                    min-w-[900px]
                "
            >
                <Table.Head>
                    <Table.Row>
                        <Table.Th className="px-4 py-4">
                            #
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            {isEn ? "Lesson" : "الدرس"}
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            {isEn ? "Type" : "النوع"}
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            {isEn ? "Duration" : "المدة"}
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            {isEn ? "Status" : "الحالة"}
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            {isEn ? "Order" : "الترتيب"}
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            {isEn ? "Actions" : "الإجراءات"}
                        </Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {
                        lessons.map((lesson) => (
                            <Table.Row
                                key={lesson._id}
                            >
                                {/* Number */}
                                <Table.Td>
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <HiOutlineBars3
                                            className="
                                                cursor-grab
                                                text-text-secondary
                                            "
                                            size={20}
                                        />

                                        {lesson.sortOrder}

                                    </div>
                                </Table.Td>

                                {/* Title */}
                                <Table.Td>
                                    {localize(lesson.title, isEn ? "Untitled Lesson" : "درس بدون عنوان")}
                                </Table.Td>

                                {/* Type */}
                                <Table.Td>
                                    <span
                                        className="
                                            rounded-full

                                            bg-primary/10

                                            px-3
                                            py-1

                                            text-sm

                                            text-primary
                                        "
                                    >
                                        {lesson.type || "Video"}
                                    </span>
                                </Table.Td>

                                {/* Duration */}
                                <Table.Td>
                                    {lesson.duration}
                                </Table.Td>

                                {/* Status */}
                                <Table.Td>
                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-sm

                                            ${lesson.isPublished
                                                ?
                                                "bg-success/10 text-success"
                                                :
                                                "bg-warning/10 text-warning"
                                            }
                                        `}
                                    >
                                        {lesson.isPublished ? (isEn ? "Published" : "منشور") : (isEn ? "Draft" : "مسودة")}
                                    </span>
                                </Table.Td>

                                {/* Sort Order */}
                                <Table.Td>
                                    {lesson.sortOrder}
                                </Table.Td>

                                {/* Actions */}
                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <HiOutlineEye
                                                    onClick={() => router.push(`/dashboard/courses/${courseSlug}/lessons/${lesson._id}`)}
                                                    className="text-primary cursor-pointer hover:opacity-80 transition"
                                                    title={isEn ? "View Lesson" : "عرض الدرس"}
                                                />
                                                <MdOutlineEdit
                                                    onClick={() => router.push(`/dashboard/courses/${courseSlug}/lessons/${lesson._id}/edit`)}
                                                    className="text-primary cursor-pointer hover:opacity-80 transition"
                                                    title={isEn ? "Edit Lesson" : "تعديل الدرس"}
                                                />
                                                <MdOutlineDelete
                                                    onClick={() => handleDeleteRequest(lesson._id)}
                                                    className="text-error cursor-pointer hover:opacity-80 transition"
                                                    title={isEn ? "Delete Lesson" : "حذف الدرس"}
                                                />
                                            </div>
                                        }
                                    />
                                </Table.Td>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            <DeleteModal onConfirmAction={handleDelete} />
        </Section>
    );
};

export default LessonsTable;
