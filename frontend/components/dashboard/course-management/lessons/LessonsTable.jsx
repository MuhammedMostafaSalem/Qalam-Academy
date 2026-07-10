"use client";

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

const lessons = [
    {
        id: 1,
        title: "Introduction to Frontend",
        type: "Video",
        duration: "10:30",
        status: "Published",
        date: "15 Jan 2025",
    },
    {
        id: 2,
        title: "HTML & CSS Basics",
        type: "Video",
        duration: "25:00",
        status: "Published",
        date: "18 Jan 2025",
    },
    {
        id: 3,
        title: "JavaScript Fundamentals",
        type: "Video",
        duration: "45:20",
        status: "Draft",
        date: "20 Jan 2025",
    },
];


const LessonsTable = () => {
    const { courseId } = useParams();
    const router = useRouter()
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
                            التاريخ
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
                                key={lesson.id}
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

                                        {lesson.id}

                                    </div>
                                </Table.Td>

                                {/* Title */}
                                <Table.Td>
                                    {lesson.title}
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
                                        {lesson.type}
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

                                            ${lesson.status === "Published"
                                                ?
                                                "bg-green-500/10 text-green-500"
                                                :
                                                "bg-yellow-500/10 text-yellow-500"
                                            }
                                        `}
                                    >
                                        {lesson.status}
                                    </span>
                                </Table.Td>

                                {/* Date */}
                                <Table.Td>
                                    {lesson.date}
                                </Table.Td>

                                {/* Actions */}
                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <HiOutlineEye
                                                    onClick={() => router.push(`/dashboard/courses/${courseId}/lessons/${lesson.id}`)}
                                                    className="text-primary cursor-pointer"
                                                />
                                                <MdOutlineEdit
                                                    onClick={() => router.push(`/dashboard/courses/${courseId}/lessons/${lesson.id}/edit`)}
                                                    className="text-primary cursor-pointer"
                                                />
                                                <MdOutlineDelete
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