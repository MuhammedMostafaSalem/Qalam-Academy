"use client";

import Table from "@/components/ui/Table";
import useOrders from "@/hooks/orders/useOrders";
import {
    HiOutlineAcademicCap,
    HiOutlineShoppingBag,
    HiOutlineSquares2X2,
    HiOutlineEye,
} from "react-icons/hi2";

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
    "ملغى": "bg-red-500/10 text-red-600",
    "مسترد": "bg-gray-500/10 text-gray-600",
};

const mapPaymentMethod = (method) => {
    switch (method) {
        case "cash":
            return "نقدي";
        case "paymob":
            return "Paymob";
        case "paypal":
            return "PayPal";
        default:
            return method || "—";
    }
};

const mapPaymentStatus = (status) => {
    switch (status) {
        case "pending":
            return "قيد المعالجة";
        case "paid":
            return "مكتمل";
        case "cancelled":
            return "ملغى";
        default:
            return status || "—";
    }
};

const getOrderType = (cartItems = []) => {
    const hasCourse = cartItems.some((item) => item.itemType === "course");
    const hasProduct = cartItems.some((item) => item.itemType === "product");
    if (hasCourse && hasProduct) return "mixed";
    if (hasCourse) return "course";
    if (hasProduct) return "product";
    return "product";
};

const OrdersTable = () => {
    const { orders, loading, error } = useOrders();

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                جاري تحميل الطلبات...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10 text-center text-red-500">
                {error}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="py-10 text-center text-gray-500">
                لا يوجد طلبات متاحة
            </div>
        );
    }

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
                    const typeKey = getOrderType(order.cartItems);
                    const Type = typeConfig[typeKey];
                    const statusLabel = mapPaymentStatus(order.paymentStatus);

                    return (
                        <Table.Row
                            key={order._id}
                        >
                            <Table.Td>
                                #{order._id?.slice(-6).toUpperCase()}
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
                                {order.cartItems?.length ?? 0}
                            </Table.Td>

                            <Table.Td>
                                {order.totalOrderPrice} ج.م
                            </Table.Td>

                            <Table.Td>
                                {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                            </Table.Td>

                            <Table.Td>
                                <span
                                    className={`
                                            rounded-full

                                            px-3
                                            py-1

                                            text-xs

                                            font-medium

                                            ${statusColors[statusLabel]}
                                        `}
                                >
                                    {statusLabel}
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