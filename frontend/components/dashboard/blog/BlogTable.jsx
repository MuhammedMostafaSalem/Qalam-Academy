import Table from "@/components/ui/Table";
import blog from "./blog";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";

const BlogTable = () => {
    const titleHead = [
        "المقالة",
        "التصنيف",
        "الكاتب",
        "الحالة",
        "تاريخ النشر",
        "تاريخ التعديل",
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
                    {blog.map(blog => (
                        <Table.Row key={blog.id}>
                            <Table.Td>
                                <CardTable data={blog} />
                            </Table.Td>

                            <Table.Td>{blog.category}</Table.Td>

                            <Table.Td>{blog.author}</Table.Td>

                            <Table.Td>{blog.status}</Table.Td>

                            <Table.Td>{blog.createdAt}</Table.Td>

                            <Table.Td>{blog.updatedAt}</Table.Td>

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

export default BlogTable