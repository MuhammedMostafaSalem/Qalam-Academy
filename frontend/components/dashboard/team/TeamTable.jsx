import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import team from "./team";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const TeamTable = () => {
    const titleHead = [
        "العضو",
        "المنصب",
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
                    {team.map(team => (
                        <Table.Row key={team.id}>
                            <Table.Td>
                                <CardTable data={team} />
                            </Table.Td>

                            <Table.Td>{team.category}</Table.Td>
                            
                            <Table.Td>{team.order}</Table.Td>

                            <Table.Td>{team.createdAt}</Table.Td>

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

export default TeamTable