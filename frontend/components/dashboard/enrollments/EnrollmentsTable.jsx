import Table from "@/components/ui/Table";
import enrollments from "./enrollments";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";

const EnrollmentsTable = () => {
    const titleHead = [
        "المشترك",
        "الكورس",
        "طريقة الدفع",
        "السعر",
        "تاريخ الاشتراك",
        "الإجراءات",
    ];

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
                    {enrollments.map(enrollment => (
                        <Table.Row key={enrollment.id}>
                            <Table.Td>
                                <CardTable data={enrollment} />
                            </Table.Td>

                            <Table.Td>{enrollment.course}</Table.Td>

                            <Table.Td>{enrollment.payment}</Table.Td>

                            <Table.Td>{enrollment.pice}</Table.Td>

                            <Table.Td>{enrollment.createdAt}</Table.Td>

                            <Table.Td>
                                <ActionsTable
                                    actions={
                                        <div className="flex gap-3 justify-center items-center text-[20px]">
                                            <MdOutlineEdit className="text-primary cursor-pointer" />
                                            <div className="text-error cursor-pointer">
                                                <MdOutlineDelete />
                                            </div>
                                        </div>
                                    }
                                />
                            </Table.Td>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <LoadMore />
        </div>
    )
}

export default EnrollmentsTable