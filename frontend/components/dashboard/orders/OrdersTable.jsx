import Table from "@/components/ui/Table";
import orders from "./orders";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import CardTable from "@/components/shared/CardTable";

const OrdersTable = () => {
    const titleHead = [
        "رقم الطلب",
        "العميل",
        "المبلغ",
        "طريقة الدفع",
        "الحالة",
        "تاريخ الطلب",
        "النوع",
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
                    {orders.map(order => (
                        <Table.Row key={order.id}>
                            <Table.Td>{order.orderNum}</Table.Td>

                            <Table.Td>
                                <CardTable data={order} />
                            </Table.Td>

                            <Table.Td>{order.price}</Table.Td>

                            <Table.Td>{order.payment}</Table.Td>

                            <Table.Td>{order.status}</Table.Td>

                            <Table.Td>{order.createdAt}</Table.Td>

                            <Table.Td>{order.orderType}</Table.Td>

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

export default OrdersTable