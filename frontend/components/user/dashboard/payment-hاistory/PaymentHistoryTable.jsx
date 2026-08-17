"use client";

import Table from "@/components/ui/Table";
import useOrders from "@/hooks/orders/useOrders";
import { useSearchParams } from "next/navigation";
import {
    HiOutlineBanknotes,
    HiOutlineEye
} from "react-icons/hi2";

const mapPaymentMethod = (method) => {
    switch (method) {
        case "cash":
            return "الدفع عند الاستلام";
        case "paymob":
            return "بطاقة ائتمان (Paymob)";
        case "paypal":
            return "حساب بايبال (PayPal)";
        default:
            return method || "وسيلة إلكترونية";
    }
};

const mapPaymentStatus = (isPaid, status) => {
    if (isPaid || status === "paid") return { label: "ناجحة", color: "bg-green-500/10 text-green-600" };
    if (status === "cancelled") return { label: "ملغاة", color: "bg-red-500/10 text-red-600" };
    return { label: "قيد المعالجة", color: "bg-yellow-500/10 text-yellow-600" };
};

const PaymentHistoryTable = () => {
    const { orders, loading, error } = useOrders();
    const searchParams = useSearchParams();

    const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();
    const methodFilter = searchParams.get("method") || "all";
    const statusFilter = searchParams.get("status") || "all";

    if (loading) {
        return (
            <div className="py-12 text-center text-text-secondary">
                جاري تحميل سجل المدفوعات...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center text-error">
                {error}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="py-12 text-center text-text-muted">
                لا توجد مدفوعات مسجلة حتى الآن
            </div>
        );
    }

    // Filter payment orders based on URL params
    const filteredOrders = orders.filter((order) => {
        const txnId = (order.paymentIntentId || order.transactionId || order._id || "").toLowerCase();
        const orderIdStr = (order._id || "").toLowerCase();

        const matchesSearch = !searchQuery || txnId.includes(searchQuery) || orderIdStr.includes(searchQuery);

        const method = order.paymentMethodType || "cash";
        const matchesMethod = methodFilter === "all" || method === methodFilter;

        let matchesStatus = true;
        if (statusFilter === "paid") {
            matchesStatus = order.isPaid || order.paymentStatus === "paid";
        } else if (statusFilter === "pending") {
            matchesStatus = !order.isPaid && order.paymentStatus === "pending";
        } else if (statusFilter === "cancelled") {
            matchesStatus = order.paymentStatus === "cancelled";
        }

        return matchesSearch && matchesMethod && matchesStatus;
    });

    if (filteredOrders.length === 0) {
        return (
            <div className="py-12 text-center text-text-muted">
                لا توجد نتائج مدفوعات تطابق خيارات التصفية والبحث المختارة
            </div>
        );
    }

    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Th>رقم العملية / المعاملة</Table.Th>
                    <Table.Th>رقم الطلب</Table.Th>
                    <Table.Th>وسيلة الدفع</Table.Th>
                    <Table.Th>المبلغ</Table.Th>
                    <Table.Th>التاريخ</Table.Th>
                    <Table.Th>الحالة</Table.Th>
                    <Table.Th>الإجراء</Table.Th>
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {filteredOrders.map((order, index) => {
                    const methodLabel = mapPaymentMethod(order.paymentMethodType);
                    const statusObj = mapPaymentStatus(order.isPaid, order.paymentStatus);
                    const txnId = order.paymentIntentId || order.transactionId || `TXN-${order._id?.slice(-8).toUpperCase()}`;
                    const orderNum = `#ORD-${order._id?.slice(-6).toUpperCase()}`;
                    const dateStr = order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("ar-EG")
                        : "—";

                    return (
                        <Table.Row key={order._id || index}>
                            <Table.Td className="font-mono text-xs">
                                {txnId}
                            </Table.Td>

                            <Table.Td className="font-mono text-xs">
                                {orderNum}
                            </Table.Td>

                            <Table.Td>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <HiOutlineBanknotes size={18} />
                                    </div>
                                    <span className="text-sm font-medium">{methodLabel}</span>
                                </div>
                            </Table.Td>

                            <Table.Td className="font-bold text-primary">
                                {order.totalOrderPrice} ج.م
                            </Table.Td>

                            <Table.Td>
                                {dateStr}
                            </Table.Td>

                            <Table.Td>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusObj.color}`}>
                                    {statusObj.label}
                                </span>
                            </Table.Td>

                            <Table.Td>
                                <div className="flex justify-center">
                                    <button className="p-2 text-white/70 hover:text-white transition" title="عرض التفاصيل">
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

export default PaymentHistoryTable;