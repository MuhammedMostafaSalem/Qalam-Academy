"use client";

import Table from "@/components/ui/Table";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import CardTable from "@/components/shared/CardTable";
import useOrders from "@/hooks/orders/useOrders";
import useToast from "@/hooks/useToast";
import { cancelOrderAction } from "@/actions/orderActions";
import { useState } from "react";
import userIcon from "@/public/assets/user-icon.png";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";

const OrdersTable = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const STATUS_MAP = {
        pending: { label: isEn ? "Pending" : "قيد الانتظار", class: "bg-warning/20 text-warning" },
        paid: { label: isEn ? "Paid" : "مدفوع", class: "bg-success/20 text-success" },
        cancelled: { label: isEn ? "Cancelled" : "ملغى", class: "bg-error/20 text-error" },
        delivered: { label: isEn ? "Delivered" : "مُسلَّم", class: "bg-primary/20 text-primary" },
    };

    const PAYMENT_MAP = {
        cash: isEn ? "Cash" : "نقدي",
        paymob: "Paymob",
        paypal: "PayPal",
        card: isEn ? "Credit Card" : "بطاقة ائتمان",
        wallet: isEn ? "E-Wallet" : "محفظة إلكترونية",
        fawry: isEn ? "Fawry" : "فوري",
    };

    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const { orders, loading, error, meta, refetch } = useOrders(queryString);
    const { user: currentUser } = useAuth();
    const isInstructor = currentUser?.role === "instructor";
    const { successMessage, errorMessage } = useToast();
    const [cancellingId, setCancellingId] = useState(null);

    const titleHead = isEn ? [
        "Order #",
        "Customer",
        "Amount",
        "Payment Method",
        "Status",
        "Order Date",
        ...(isInstructor ? [] : ["Actions"]),
    ] : [
        "رقم الطلب",
        "العميل",
        "المبلغ",
        "طريقة الدفع",
        "الحالة",
        "تاريخ الطلب",
        ...(isInstructor ? [] : ["الإجراءات"]),
    ];

    const handleCancel = async (orderId) => {
        if (!confirm(isEn ? "Are you sure you want to cancel this order?" : "هل أنت متأكد من إلغاء هذا الطلب؟")) return;

        setCancellingId(orderId);
        const result = await cancelOrderAction(orderId);

        if (result.success) {
            successMessage(result.message || (isEn ? "Order cancelled successfully" : "تم إلغاء الطلب بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to cancel order" : "فشل إلغاء الطلب"));
        }

        setCancellingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">{isEn ? "Loading orders..." : "جاري تحميل الطلبات..."}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-error">{error}</p>
            </div>
        );
    }

    return (
        <div className="mt-[20px]">
            {orders.length === 0 ? (
                <div className="text-center py-6 text-text-muted">
                    {isEn ? "No orders available" : "لا يوجد طلبات متاحة"}
                </div>
            ) : (
                <div className="overflow-x-auto overflow-y-hidden">
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                {titleHead.map((title, index) => (
                                    <Table.Th key={index}>{title}</Table.Th>
                                ))}
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {orders.map(order => {
                                const status = STATUS_MAP[order.status] || { label: order.status, class: "" };
                                const user = order.user;

                                return (
                                    <Table.Row key={order._id}>
                                        <Table.Td>
                                            <span className="font-mono text-xs text-text-secondary">
                                                #{order._id?.slice(-6).toUpperCase()}
                                            </span>
                                        </Table.Td>

                                        <Table.Td>
                                            <CardTable
                                                data={{
                                                    image: user?.avatar || userIcon,
                                                    name: user ? `${user.firstName} ${user.lastName}` : "—",
                                                    description: user?.email || "",
                                                }}
                                            />
                                        </Table.Td>

                                        <Table.Td>
                                            {order.totalOrderPrice?.toLocaleString(isEn ? "en-US" : "ar-EG")} {isEn ? "EGP" : "ج.م"}
                                        </Table.Td>

                                        <Table.Td>
                                            {PAYMENT_MAP[order.paymentMethodType] || order.paymentMethodType}
                                        </Table.Td>

                                        <Table.Td>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.class}`}>
                                                {status.label}
                                            </span>
                                        </Table.Td>

                                        <Table.Td>
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                                : "—"}
                                        </Table.Td>

                                        {!isInstructor && (
                                            <Table.Td>
                                                <ActionsTable
                                                    actions={
                                                        <div className="flex gap-3 justify-center items-center text-[20px]">
                                                            {order.status !== "paid" && (
                                                                <div
                                                                    className="text-error cursor-pointer"
                                                                    onClick={() => handleCancel(order._id)}
                                                                >
                                                                    {cancellingId === order._id ? (
                                                                        <span className="text-sm">...</span>
                                                                    ) : (
                                                                        <MdOutlineDelete />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                />
                                            </Table.Td>
                                        )}
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>

                    {meta?.hasMore && <LoadMore />}
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
