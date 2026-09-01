"use client";

import Section from "@/components/sections/Section";
import Table from "@/components/ui/Table";
import { MdOutlineEmail } from "react-icons/md";
import { useLanguage } from "@/providers/LanguageProvider";
import { resolveAvatarUrl } from "@/constants/avatar";
import useEnrollments from "@/hooks/enrollments/useEnrollments";

const StudentsTable = ({ courseId }) => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const queryString = courseId ? `course=${encodeURIComponent(courseId)}` : "";
    const { enrollments, loading, error } = useEnrollments(queryString);

    if (loading) {
        return <div className="py-10 text-center text-text-secondary">{isEn ? "Loading students..." : "جاري تحميل الطلاب..."}</div>;
    }

    if (error) {
        return <div className="py-10 text-center text-error">{error}</div>;
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
                    min-w-[1050px]
                "
            >
                <Table.Head>
                    <Table.Row>
                        <Table.Th>#</Table.Th>
                        <Table.Th>{isEn ? "Student" : "الطالب"}</Table.Th>
                        <Table.Th>{isEn ? "Email" : "البريد الإلكتروني"}</Table.Th>
                        <Table.Th>{isEn ? "Progress" : "التقدم"}</Table.Th>
                        <Table.Th>{isEn ? "Status" : "الحالة"}</Table.Th>
                        <Table.Th>{isEn ? "Enrollment Date" : "تاريخ الاشتراك"}</Table.Th>
                        <Table.Th>{isEn ? "Actions" : "الإجراءات"}</Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {enrollments.length === 0 ? (
                        <Table.Row>
                            <Table.Td colSpan={7}>
                                <div className="py-8 text-center text-text-muted">
                                    {isEn ? "No students are enrolled in this course." : "لا يوجد طلاب مسجلون في هذا الكورس."}
                                </div>
                            </Table.Td>
                        </Table.Row>
                    ) : enrollments.map((enrollment, index) => {
                        const student = enrollment.user || {};
                        const progress = enrollment.progress || 0;
                        const isCompleted = enrollment.isCompleted || progress >= 100;
                        const studentName = student.firstName
                            ? `${student.firstName} ${student.lastName || ""}`.trim()
                            : student.email || (isEn ? "Unknown student" : "طالب غير معروف");

                        return (
                        <Table.Row key={enrollment._id}>
                            <Table.Td>
                                {index + 1}
                            </Table.Td>

                            <Table.Td>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={resolveAvatarUrl(student.avatar)}
                                        alt={studentName}
                                        className="
                                            h-10
                                            w-10
                                            rounded-full
                                        "
                                    />

                                    <span>
                                        {studentName}
                                    </span>
                                </div>
                            </Table.Td>

                            <Table.Td>
                                {student.email || "—"}
                            </Table.Td>

                            <Table.Td>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            h-2
                                            w-32
                                            overflow-hidden
                                            rounded-full
                                            bg-border
                                        "
                                    >
                                        <div
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                            className="
                                                h-full
                                                bg-primary
                                            "
                                        />
                                    </div>

                                    <span>
                                        {progress}%
                                    </span>
                                </div>
                            </Table.Td>

                            <Table.Td>
                                <span
                                    className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-sm

                                        ${isCompleted
                                            ? "bg-success/10 text-success"
                                            : "bg-primary/10 text-primary"
                                        }
                                    `}
                                >
                                    {isCompleted ? (isEn ? "Completed" : "مكتمل") : (isEn ? "In Progress" : "قيد الدراسة")}
                                </span>
                            </Table.Td>

                            <Table.Td>
                                {enrollment.createdAt
                                    ? new Date(enrollment.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                    : "—"}
                            </Table.Td>

                            <Table.Td>
                                {student.email ? (
                                    <a href={`mailto:${student.email}`} className="inline-flex text-[20px] text-primary" title={isEn ? "Email student" : "مراسلة الطالب"}>
                                        <MdOutlineEmail />
                                    </a>
                                ) : "—"}
                            </Table.Td>
                        </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </Section>
    );
};

export default StudentsTable;
