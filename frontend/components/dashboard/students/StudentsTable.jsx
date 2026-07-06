import Table from "@/components/ui/Table"
import CardTable from "@/components/shared/CardTable"
import ActionsTable from "@/components/shared/ActionsTable"
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import students from "./students";

const StudentsTable = () => {
    const titleHead = [
        "الطالب",
        "الكورسات المسجلة",
        "المستوى",
        "تاريخ التسجيل",
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
                    {students.map(student => (
                        <Table.Row key={student.id}>
                            <Table.Td>
                                <CardTable data={student} />
                            </Table.Td>

                            <Table.Td>{student.coursesRecored} كورس</Table.Td>

                            <Table.Td>{student.order}</Table.Td>

                            <Table.Td>{student.createdAt}</Table.Td>

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

export default StudentsTable