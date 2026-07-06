import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import categories from "./categories";

const CategoriesTable = () => {
    const titleHead = [
        "التصنيف",
        "عدد الكورسات",
        "ترتيب العرض",
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
                    {categories.map(category => (
                        <Table.Row key={category.id}>
                            <Table.Td>
                                <CardTable data={category} />
                            </Table.Td>

                            <Table.Td>{category.coursesCount}</Table.Td>
                            <Table.Td>{category.order}</Table.Td>

                            <Table.Td>{category.createdAt}</Table.Td>

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

export default CategoriesTable