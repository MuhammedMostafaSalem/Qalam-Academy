import Table from "@/components/ui/Table";
import {
    HiOutlineAcademicCap,
    HiOutlineShoppingBag,
    HiOutlineSquares2X2,
    HiOutlineEye,
} from "react-icons/hi2";

const orders = [
    {
        id: "#ORD-1001",
        type: "course",
        items: 2,
        total: "999 ج.م",
        status: "مكتمل",
        date: "10 يوليو 2026",
    },
    {
        id: "#ORD-1002",
        type: "product",
        items: 1,
        total: "350 ج.م",
        status: "قيد المعالجة",
        date: "8 يوليو 2026",
    },
    {
        id: "#ORD-1003",
        type: "mixed",
        items: 4,
        total: "1650 ج.م",
        status: "مكتمل",
        date: "5 يوليو 2026",
    },
    {
        id: "#ORD-1004",
        type: "product",
        items: 1,
        total: "220 ج.م",
        status: "ملغي",
        date: "1 يوليو 2026",
    },
];

const typeConfig = {
    course: {
        label: "كورسات",
        icon: HiOutlineAcademicCap,
        color: "bg-blue-500/10 text-blue-500",
    },
    product: {
        label: "منتجات",
        icon: HiOutlineShoppingBag,
        color: "bg-green-500/10 text-green-500",
    },
    mixed: {
        label: "مختلط",
        icon: HiOutlineSquares2X2,
        color: "bg-purple-500/10 text-purple-500",
    },
};

const statusColors = {
    "مكتمل": "bg-green-500/10 text-green-600",
    "قيد المعالجة": "bg-yellow-500/10 text-yellow-600",
    "ملغي": "bg-red-500/10 text-red-600",
    "مسترد": "bg-gray-500/10 text-gray-600",
};

const OrdersTable = () => {
    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Th>رقم الطلب</Table.Th>
                    <Table.Th>النوع</Table.Th>
                    <Table.Th>عدد العناصر</Table.Th>
                    <Table.Th>الإجمالي</Table.Th>
                    <Table.Th>التاريخ</Table.Th>
                    <Table.Th>الحالة</Table.Th>
                    <Table.Th>الإجراءات</Table.Th>
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {orders.map((order) => {
                    const Type = typeConfig[order.type];

                    return (
                        <Table.Row
                            key={order.id}
                        >
                            <Table.Td>
                                {order.id}
                            </Table.Td>

                            <Table.Td>
                                <div
                                    className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                >
                                    <div
                                        className={`
                                                flex

                                                h-10
                                                w-10

                                                items-center
                                                justify-center

                                                rounded-xl

                                                ${Type.color}
                                            `}
                                    >
                                        <Type.icon size={20} />
                                    </div>

                                    {Type.label}
                                </div>
                            </Table.Td>

                            <Table.Td>
                                {order.items}
                            </Table.Td>

                            <Table.Td>
                                {order.total}
                            </Table.Td>

                            <Table.Td>
                                {order.date}
                            </Table.Td>

                            <Table.Td>
                                <span
                                    className={`
                                            rounded-full

                                            px-3
                                            py-1

                                            text-xs

                                            font-medium

                                            ${statusColors[order.status]}
                                        `}
                                >
                                    {order.status}
                                </span>
                            </Table.Td>

                            <Table.Td>
                                <div className="flex justify-center">
                                    <button
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <HiOutlineEye size={18} />
                                    </button>
                                </div>
                            </Table.Td>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default OrdersTable;