import Section from "@/components/sections/Section";
import ActionsTable from "@/components/shared/ActionsTable";
import Table from "@/components/ui/Table";
import { HiOutlineEye } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";

const students = [
    {
        id: 1,
        name: "Ahmed Mohamed",
        email: "ahmed@gmail.com",
        progress: 85,
        status: "نشط",
        enrolledAt: "15 Jan 2025",
    },
    {
        id: 2,
        name: "Sara Ali",
        email: "sara@gmail.com",
        progress: 45,
        status: "نشط",
        enrolledAt: "20 Jan 2025",
    },
    {
        id: 3,
        name: "Omar Hassan",
        email: "omar@gmail.com",
        progress: 100,
        status: "مكتمل",
        enrolledAt: "10 Jan 2025",
    },
];

const StudentsTable = () => {
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
                        <Table.Th>الطالب</Table.Th>
                        <Table.Th>البريد الإلكتروني</Table.Th>
                        <Table.Th>التقدم</Table.Th>
                        <Table.Th>الحالة</Table.Th>
                        <Table.Th>تاريخ الاشتراك</Table.Th>
                        <Table.Th>الإجراءات</Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {students.map((student) => (
                        <Table.Row key={student.id}>
                            <Table.Td>
                                {student.id}
                            </Table.Td>

                            <Table.Td>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://i.pravatar.cc/100?img=${student.id + 10}`}
                                        alt={student.name}
                                        className="
                                            h-10
                                            w-10
                                            rounded-full
                                        "
                                    />

                                    <span>
                                        {student.name}
                                    </span>
                                </div>
                            </Table.Td>

                            <Table.Td>
                                {student.email}
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
                                                width: `${student.progress}%`,
                                            }}
                                            className="
                                                h-full
                                                bg-primary
                                            "
                                        />
                                    </div>

                                    <span>
                                        {student.progress}%
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

                                        ${student.status === "مكتمل"
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-primary/10 text-primary"
                                        }
                                    `}
                                >
                                    {student.status}
                                </span>
                            </Table.Td>

                            <Table.Td>
                                {student.enrolledAt}
                            </Table.Td>

                            <Table.Td>
                                <ActionsTable
                                    actions={
                                        <div className="flex items-center justify-center gap-4 text-[20px]">
                                            <HiOutlineEye
                                                className="
                                                    cursor-pointer
                                                    text-primary
                                                "
                                            />

                                            <MdOutlineEmail
                                                className="
                                                    cursor-pointer
                                                    text-primary
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

export default StudentsTable;