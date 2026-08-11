"use client";

import { useState, useEffect } from "react";
import Section from "@/components/sections/Section";
import ActionsTable from "@/components/shared/ActionsTable";
import Table from "@/components/ui/Table";
import { useParams, useRouter } from "next/navigation";
import {
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineBars3,
} from "react-icons/hi2";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { getLessonsAction, deleteLessonAction } from "@/actions/lessonActions";


const LessonsTable = ({ courseId }) => {
    const router = useRouter();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, [courseId]);

    const handleDelete = async (id) => {
        const result = await deleteLessonAction(id);
        if (result.success) {
            fetchLessons();
        }
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
                    لا توجد دروس لهذا الكورس بعد.
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
                            الدرس
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            النوع
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            المدة
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            الحالة
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            الترتيب
                        </Table.Th>
                        <Table.Th className="px-4 py-4">
                            الإجراءات
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
                                    {lesson.title?.ar || lesson.title}
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
                                                "bg-green-500/10 text-green-500"
                                                :
                                                "bg-yellow-500/10 text-yellow-500"
                                            }
                                        `}
                                    >
                                        {lesson.isPublished ? "Published" : "Draft"}
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
                                                    onClick={() => router.push(`/dashboard/courses/${courseId}/lessons/${lesson._id}`)}
                                                    className="text-primary cursor-pointer"
                                                />
                                                <MdOutlineEdit
                                                    onClick={() => router.push(`/dashboard/courses/${courseId}/lessons/${lesson._id}/edit`)}
                                                    className="text-primary cursor-pointer"
                                                />
                                                <MdOutlineDelete
                                                    onClick={() => handleDelete(lesson._id)}
                                                    className="text-error cursor-pointer"
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
        </Section>
    );
};

export default LessonsTable;