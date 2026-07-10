import Section from "@/components/sections/Section";
import ActionsTable from "@/components/shared/ActionsTable";
import Table from "@/components/ui/Table";
import {
    HiOutlineEye,
    HiOutlineTrash,
} from "react-icons/hi2";


const messages = [
    {
        id: 1,
        name: "Ahmed Mohamed",
        email: "ahmed@gmail.com",
        subject: "استفسار عن كورس React",
        status: "غير مقروء",
        date: "10 Feb 2025",
    },
    {
        id: 2,
        name: "Sara Ali",
        email: "sara@gmail.com",
        subject: "طلب تعاون",
        status: "مقروء",
        date: "12 Feb 2025",
    },
    {
        id: 3,
        name: "Omar Hassan",
        email: "omar@gmail.com",
        subject: "مشكلة في الدفع",
        status: "غير مقروء",
        date: "15 Feb 2025",
    },
];


const MessagesTable = () => {
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
                        <Table.Th>
                            #
                        </Table.Th>
                        <Table.Th>
                            الاسم
                        </Table.Th>
                        <Table.Th>
                            البريد
                        </Table.Th>
                        <Table.Th>
                            الموضوع
                        </Table.Th>
                        <Table.Th>
                            الحالة
                        </Table.Th>
                        <Table.Th>
                            التاريخ
                        </Table.Th>
                        <Table.Th>
                            الإجراءات
                        </Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {
                        messages.map((message) => (
                            <Table.Row
                                key={message.id}
                            >
                                <Table.Td>
                                    {message.id}
                                </Table.Td>
                                <Table.Td>
                                    {message.name}
                                </Table.Td>
                                <Table.Td>
                                    {message.email}
                                </Table.Td>
                                <Table.Td>
                                    <p
                                        className="
                                            max-w-xs
                                            truncate
                                        "
                                    >
                                        {message.subject}
                                    </p>
                                </Table.Td>
                                <Table.Td>
                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-sm

                                            ${message.status === "غير مقروء"
                                                ?
                                                "bg-red-500/10 text-red-500"
                                                :
                                                "bg-green-500/10 text-green-500"
                                            }
                                        `}
                                    >
                                        {message.status}
                                    </span>
                                </Table.Td>
                                <Table.Td>
                                    {message.date}
                                </Table.Td>
                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div
                                                className="
                                                    flex
                                                    justify-center
                                                    items-center
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
                        ))
                    }
                </Table.Body>
            </Table>
        </Section>
    );
};


export default MessagesTable;