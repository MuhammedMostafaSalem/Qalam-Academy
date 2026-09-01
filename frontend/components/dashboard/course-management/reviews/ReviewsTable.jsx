"use client";

import Section from "@/components/sections/Section";
import Table from "@/components/ui/Table";
import { resolveAvatarUrl } from "@/constants/avatar";
import useReviews from "@/hooks/reviews/useReviews";
import { useLanguage } from "@/providers/LanguageProvider";
import { HiStar } from "react-icons/hi2";

const ReviewsTable = ({ courseId }) => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const queryString = courseId ? `course=${encodeURIComponent(courseId)}` : "";
    const { reviews, loading, error } = useReviews(queryString);

    if (loading) {
        return <div className="py-10 text-center text-text-secondary">{isEn ? "Loading reviews..." : "جاري تحميل التقييمات..."}</div>;
    }

    if (error) {
        return <div className="py-10 text-center text-error">{error}</div>;
    }

    return (
        <Section className="overflow-x-auto">
            <Table className="w-full min-w-[900px]">
                <Table.Head>
                    <Table.Row>
                        <Table.Th>#</Table.Th>
                        <Table.Th>{isEn ? "Student" : "الطالب"}</Table.Th>
                        <Table.Th>{isEn ? "Rating" : "التقييم"}</Table.Th>
                        <Table.Th>{isEn ? "Comment" : "التعليق"}</Table.Th>
                        <Table.Th>{isEn ? "Date" : "التاريخ"}</Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {reviews.length === 0 ? (
                        <Table.Row>
                            <Table.Td colSpan={5}>
                                <div className="py-8 text-center text-text-muted">
                                    {isEn ? "This course has no reviews yet." : "لا توجد تقييمات لهذا الكورس حتى الآن."}
                                </div>
                            </Table.Td>
                        </Table.Row>
                    ) : reviews.map((review, index) => {
                        const student = review.user || {};
                        const studentName = student.firstName
                            ? `${student.firstName} ${student.lastName || ""}`.trim()
                            : student.email || (isEn ? "Unknown student" : "طالب غير معروف");

                        return (
                            <Table.Row key={review._id}>
                                <Table.Td>{index + 1}</Table.Td>

                                <Table.Td>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={resolveAvatarUrl(student.avatar)}
                                            alt={studentName}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div>
                                            <div>{studentName}</div>
                                            {student.email && <div className="text-xs text-text-muted">{student.email}</div>}
                                        </div>
                                    </div>
                                </Table.Td>

                                <Table.Td>
                                    <div className="flex items-center gap-1 text-accent">
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <HiStar
                                                key={starIndex}
                                                size={18}
                                                className={starIndex < review.rating ? "" : "opacity-25"}
                                            />
                                        ))}
                                        <span className="ms-2 text-sm text-text-secondary">({review.rating})</span>
                                    </div>
                                </Table.Td>

                                <Table.Td>
                                    <p className="max-w-md whitespace-normal break-words">{review.comment}</p>
                                </Table.Td>

                                <Table.Td>
                                    {review.createdAt
                                        ? new Date(review.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                        : "—"}
                                </Table.Td>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </Section>
    );
};

export default ReviewsTable;
