"use client";

import Table from "@/components/ui/Table";
import useOrders from "@/hooks/orders/useOrders";
import { useSearchParams } from "next/navigation";
import {
    HiOutlineAcademicCap,
    HiOutlineShoppingBag,
    HiOutlineSquares2X2,
} from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const statusColors = {
    "paid": "bg-success/10 text-success",
    "pending": "bg-warning/10 text-warning",
    "cancelled": "bg-error/10 text-error",
    "refunded": "bg-card-hover text-text-secondary",
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
    const { language } = useLanguage();
    const isEn = language === "en";

    const typeConfig = {
        course: {
            label: isEn ? "Courses" : "كورسات",
            icon: HiOutlineAcademicCap,
            color: "bg-primary/10 text-primary",
        },
        product: {
            label: isEn ? "Products" : "منتجات",
            icon: HiOutlineShoppingBag,
            color: "bg-success/10 text-success",
        },
        mixed: {
            label: isEn ? "Mixed" : "مختلط",
            icon: HiOutlineSquares2X2,
            color: "bg-secondary/10 text-secondary",
        },
    };

    const mapPaymentStatus = (status) => {
        switch (status) {
            case "pending":
                return isEn ? "Pending" : "قيد المعالجة";
            case "paid":
                return isEn ? "Completed" : "مكتمل";
            case "cancelled":
                return isEn ? "Cancelled" : "ملغى";
            case "refunded":
                return isEn ? "Refunded" : "مسترجع";
            default:
                return status || "—";
        }
    };

    const { orders, loading, error } = useOrders();
    const searchParams = useSearchParams();

    const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();
    const typeFilter = searchParams.get("type") || "all";
    const statusFilter = searchParams.get("status") || "all";

    if (loading) {
        return (
            <div className="py-10 text-center text-text-secondary">
                {isEn ? "Loading orders..." : "جاري تحميل الطلبات..."}
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10 text-center text-error">
                {error}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="py-10 text-center text-text-secondary">
                {isEn ? "No orders available" : "لا يوجد طلبات متاحة"}
            </div>
        );
    }

    // Filter orders based on URL searchParams
    const filteredOrders = orders.filter((order) => {
        const orderIdStr = (order._id || "").toLowerCase();
        const matchesSearch = !searchQuery || orderIdStr.includes(searchQuery);

        const orderType = getOrderType(order.cartItems);
        const matchesType = typeFilter === "all" || orderType === typeFilter;

        let matchesStatus = true;
        if (statusFilter === "paid") {
            matchesStatus = order.isPaid || order.paymentStatus === "paid";
        } else if (statusFilter === "pending") {
            matchesStatus = !order.isPaid && order.paymentStatus === "pending";
        } else if (statusFilter === "cancelled") {
            matchesStatus = order.paymentStatus === "cancelled";
        }

        return matchesSearch && matchesType && matchesStatus;
    });

    if (filteredOrders.length === 0) {
        return (
        <div className="py-10 text-center text-text-secondary">
                {isEn ? "No orders matched your search and filter criteria" : "لا توجد طلبات تطابق خيارات التصفية والبحث المختارة"}
            </div>
        );
    }

    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Th>{isEn ? "Order ID" : "رقم الطلب"}</Table.Th>
                    <Table.Th>{isEn ? "Type" : "النوع"}</Table.Th>
                    <Table.Th>{isEn ? "Items Count" : "عدد العناصر"}</Table.Th>
                    <Table.Th>{isEn ? "Total" : "الإجمالي"}</Table.Th>
                    <Table.Th>{isEn ? "Date" : "التاريخ"}</Table.Th>
                    {/* <Table.Th>{isEn ? "Status" : "الحالة"}</Table.Th> */}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {filteredOrders.map((order, index) => {
                    const typeKey = getOrderType(order.cartItems);
                    const Type = typeConfig[typeKey];
                    const statusLabel = mapPaymentStatus(order.paymentStatus);
                    const statusClass = statusColors[order.paymentStatus] || "bg-card-hover text-text-secondary";

                    return (
                        <Table.Row
                            key={order._id || index}
                        >
                            <Table.Td>
                                #{order._id?.slice(-6).toUpperCase()}
                            </Table.Td>

                            <Table.Td>
                                <div className="flex items-center gap-2">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${Type.color}`}>
                                        <Type.icon size={20} />
                                    </div>
                                    {Type.label}
                                </div>
                            </Table.Td>

                            <Table.Td>
                                {order.cartItems?.length ?? 0}
                            </Table.Td>

                            <Table.Td>
                                {order.totalOrderPrice} {isEn ? "EGP" : "ج.م"}
                            </Table.Td>

                            <Table.Td>
                                {new Date(order.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")}
                            </Table.Td>

                            {/* <Table.Td>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
                                    {statusLabel}
                                </span>
                            </Table.Td> */}

                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default OrdersTable;
