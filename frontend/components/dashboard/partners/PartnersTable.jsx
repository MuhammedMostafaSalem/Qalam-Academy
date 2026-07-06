import Table from "@/components/ui/Table";
import partners from "./partners";
import CardTable from "@/components/shared/CardTable";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const PartnersTable = () => {
    const titleHead = [
        "الشريك",
        "الرابط",
        "الترتيب",
        "تاريخ الاضافة",
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
                    {partners.map(partner => (
                        <Table.Row key={partner.id}>
                            <Table.Td>
                                <CardTable data={partner} />
                            </Table.Td>

                            <Table.Td>{partner.category}</Table.Td>

                            <Table.Td>{partner.order}</Table.Td>

                            <Table.Td>{partner.createdAt}</Table.Td>

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

export default PartnersTable