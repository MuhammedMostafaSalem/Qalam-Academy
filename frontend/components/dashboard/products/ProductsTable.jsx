import Table from "@/components/ui/Table";
import products from "./products";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";

const ProductsTable = () => {
    const titleHead = [
        "المنتج",
        "السعر",
        "التصنيف",
        "المبيعات",
        "المخزون",
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
                    {products.map(product => (
                        <Table.Row key={product.id}>
                            <Table.Td>
                                <CardTable data={product} />
                            </Table.Td>

                            <Table.Td>{product.price}</Table.Td>

                            <Table.Td>{product.category}</Table.Td>

                            <Table.Td>{product.Sales}</Table.Td>

                            <Table.Td>{product.Inventory}</Table.Td>

                            <Table.Td>{product.createdAt}</Table.Td>

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

export default ProductsTable