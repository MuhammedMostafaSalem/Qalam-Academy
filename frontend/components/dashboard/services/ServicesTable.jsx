import Table from "@/components/ui/Table"
import CardTable from "@/components/shared/CardTable"
import servicesAdmin from "@/components/dashboard/services/servicesAdmin"
import ActionsTable from "@/components/shared/ActionsTable"
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";

const ServicesTable = () => {
    const titleHead = [
        "الخدمة",
        "الترتيب",
        "تاريخ الإنشاء",
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
                    {servicesAdmin.map(service => (
                        <Table.Row key={service.id}>
                            <Table.Td>
                                <CardTable data={service} />
                            </Table.Td>

                            <Table.Td>{service.order}</Table.Td>

                            <Table.Td>{service.createdAt}</Table.Td>

                            <Table.Td>
                                <ActionsTable
                                    actions={
                                        <div className="flex gap-3 items-center text-[20px]">
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

export default ServicesTable