"use client";

import Section from "@/components/sections/Section";
import ActionsTable from "@/components/shared/ActionsTable";
import Table from "@/components/ui/Table";

import {
    HiOutlineEye,
    HiOutlineTrash,
    HiStar,
} from "react-icons/hi2";

const reviews = [
    {
        id: 1,
        student: "Ahmed Mohamed",
        rating: 5,
        comment: "كورس ممتاز جدًا وشرح واضح وسهل.",
        date: "15 Jan 2025",
    },
    {
        id: 2,
        student: "Sara Ali",
        rating: 4,
        comment: "محتوى رائع لكن أتمنى إضافة مشاريع أكثر.",
        date: "20 Jan 2025",
    },
    {
        id: 3,
        student: "Omar Hassan",
        rating: 5,
        comment: "أفضل كورس Frontend حصلت عليه.",
        date: "25 Jan 2025",
    },
];

const ReviewsTable = () => {
    return (
        <Section
            className="
                overflow-x-auto
            "
        >
            <Table
                className="
                    w-full
                    min-w-[1000px]
                "
            >
                <Table.Head>
                    <Table.Row>
                        <Table.Th>#</Table.Th>
                        <Table.Th>الطالب</Table.Th>
                        <Table.Th>التقييم</Table.Th>
                        <Table.Th>التعليق</Table.Th>
                        <Table.Th>التاريخ</Table.Th>
                        <Table.Th>الإجراءات</Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {reviews.map((review) => (
                        <Table.Row key={review.id}>
                            <Table.Td>
                                {review.id}
                            </Table.Td>

                            <Table.Td>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://i.pravatar.cc/100?img=${review.id + 20}`}
                                        alt={review.student}
                                        className="
                                            h-10
                                            w-10
                                            rounded-full
                                        "
                                    />

                                    <span>
                                        {review.student}
                                    </span>
                                </div>
                            </Table.Td>

                            <Table.Td>
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1

                                        text-yellow-500
                                    "
                                >
                                    {Array.from({
                                        length: review.rating,
                                    }).map((_, index) => (
                                        <HiStar
                                            key={index}
                                            size={18}
                                        />
                                    ))}

                                    <span
                                        className="
                                            mr-2
                                            text-sm
                                            text-text-secondary
                                        "
                                    >
                                        ({review.rating})
                                    </span>
                                </div>
                            </Table.Td>

                            <Table.Td>
                                <p
                                    className="
                                        max-w-sm
                                        truncate
                                    "
                                >
                                    {review.comment}
                                </p>
                            </Table.Td>

                            <Table.Td>
                                {review.date}
                            </Table.Td>

                            <Table.Td>
                                <ActionsTable
                                    actions={
                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-4

                                                text-[20px]
                                            "
                                        >
                                            <HiOutlineEye
                                                className="
                                                    cursor-pointer
                                                    text-primary
                                                "
                                            />

                                            <HiOutlineTrash
                                                className="
                                                    cursor-pointer
                                                    text-error
                                                "
                                            />
                                        </div>
                                    }
                                />
                            </Table.Td>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Section>
    );
};

export default ReviewsTable;