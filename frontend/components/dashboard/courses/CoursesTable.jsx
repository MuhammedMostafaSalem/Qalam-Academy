import Table from "@/components/ui/Table";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import courses from "./courses";
import ActionsTable from "@/components/shared/ActionsTable";
import LoadMore from "@/components/shared/LoadMore";
import CardTable from "@/components/shared/CardTable";
import Link from "next/link";

const CoursesTable = () => {
    const titleHead = [
        "الكورس",
        "المدرب",
        "التصنيف",
        "المستوى",
        "السعر",
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
                    {courses.map(course => (
                        <Table.Row key={course.id}>
                            <Table.Td>
                                <Link href={`/dashboard/courses/${course.id}`}>
                                    <CardTable data={course} />
                                </Link>
                            </Table.Td>

                            <Table.Td>{course.instractor}</Table.Td>

                            <Table.Td>{course.category}</Table.Td>

                            <Table.Td>{course.order}</Table.Td>

                            <Table.Td>{course.price}</Table.Td>

                            <Table.Td>{course.createdAt}</Table.Td>

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

export default CoursesTable