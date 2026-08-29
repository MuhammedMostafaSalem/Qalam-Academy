"use client";

import Table from "@/components/ui/Table";
import useOrders from "@/hooks/orders/useOrders";
import { useSearchParams } from "next/navigation";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

const PaymentHistoryTable = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const mapPaymentMethod = (method) => {
        switch (method) {
            case "cash":
                return isEn ? "Cash on Delivery" : "الدفع عند الاستلام";
            case "paymob":
                return isEn ? "Credit Card (Paymob)" : "بطاقة ائتمان (Paymob)";
            case "paypal":
                return isEn ? "PayPal Account" : "حساب بايبال (PayPal)";
            default:
                return method || (isEn ? "Electronic Gateway" : "وسيلة إلكترونية");
        }
    };

    const mapPaymentStatus = (isPaid, status) => {
        if (isPaid || status === "paid") {
            return { label: isEn ? "Successful" : "ناجحة", color: "bg-success/10 text-success" };
        }
        if (status === "cancelled") {
            return { label: isEn ? "Cancelled" : "ملغاة", color: "bg-error/10 text-error" };
        }
        if (status === "refunded") {
            return { label: isEn ? "Refunded" : "مستردة", color: "bg-card-hover text-text-secondary" };
        }
        return { label: isEn ? "Pending" : "قيد المعالجة", color: "bg-warning/10 text-warning" };
    };

    const { orders, loading, error } = useOrders();
    const searchParams = useSearchParams();

    const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();
    const methodFilter = searchParams.get("method") || "all";
    const statusFilter = searchParams.get("status") || "all";

    if (loading) {
        return (
            <div className="py-12 text-center text-text-secondary">
                {isEn ? "Loading payment history..." : "جاري تحميل سجل المدفوعات..."}
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
                {isEn ? "No recorded payments yet" : "لا توجد مدفوعات مسجلة حتى الآن"}
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
                {isEn ? "No payment records match your filters" : "لا توجد نتائج مدفوعات تطابق خيارات التصفية والبحث المختارة"}
            </div>
        );
    }

    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.Th>{isEn ? "Transaction ID" : "رقم العملية / المعاملة"}</Table.Th>
                    <Table.Th>{isEn ? "Order Number" : "رقم الطلب"}</Table.Th>
                    <Table.Th>{isEn ? "Payment Method" : "وسيلة الدفع"}</Table.Th>
                    <Table.Th>{isEn ? "Amount" : "المبلغ"}</Table.Th>
                    <Table.Th>{isEn ? "Date" : "التاريخ"}</Table.Th>
                    <Table.Th>{isEn ? "Status" : "الحالة"}</Table.Th>
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {filteredOrders.map((order, index) => {
                    const methodLabel = mapPaymentMethod(order.paymentMethodType);
                    const statusObj = mapPaymentStatus(order.isPaid, order.paymentStatus);
                    const txnId = order.paymentIntentId || order.transactionId || `TXN-${order._id?.slice(-8).toUpperCase()}`;
                    const orderNum = `#ORD-${order._id?.slice(-6).toUpperCase()}`;
                    const dateStr = order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
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
                                {order.totalOrderPrice} {isEn ? "EGP" : "ج.م"}
                            </Table.Td>

                            <Table.Td>
                                {dateStr}
                            </Table.Td>

                            <Table.Td>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusObj.color}`}>
                                    {statusObj.label}
                                </span>
                            </Table.Td>

                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default PaymentHistoryTable;
