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

const STATUS_MAP = {
    pending: { label: "قيد الانتظار", class: "bg-warning/20 text-warning" },
    paid: { label: "مدفوع", class: "bg-success/20 text-success" },
    cancelled: { label: "ملغى", class: "bg-error/20 text-error" },
    delivered: { label: "مُسلَّم", class: "bg-primary/20 text-primary" },
};

const PAYMENT_MAP = {
    cash: "نقدي",
    paymob: "Paymob",
    paypal: "PayPal",
};

const OrdersTable = () => {
    const { orders, loading, error, refetch } = useOrders();
    const { successMessage, errorMessage } = useToast();
    const [cancellingId, setCancellingId] = useState(null);

    const titleHead = [
        "رقم الطلب",
        "العميل",
        "المبلغ",
        "طريقة الدفع",
        "الحالة",
        "تاريخ الطلب",
        "الإجراءات",
    ];

    const handleCancel = async (orderId) => {
        if (!confirm("هل أنت متأكد من إلغاء هذا الطلب؟")) return;

        setCancellingId(orderId);
        const result = await cancelOrderAction(orderId);

        if (result.success) {
            successMessage(result.message || "تم إلغاء الطلب بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل إلغاء الطلب");
        }

        setCancellingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري تحميل الطلبات...</p>
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
                    لا يوجد طلبات متاحة
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
                                const status = STATUS_MAP[order.paymentStatus] || { label: order.paymentStatus, class: "" };
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
                                            {order.totalOrderPrice?.toLocaleString("ar-EG")} ج.م
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
                                            {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                                        </Table.Td>

                                        <Table.Td>
                                            <ActionsTable
                                                actions={
                                                    <div className="flex gap-3 justify-center items-center text-[20px]">
                                                        {order.paymentStatus !== "paid" && (
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
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>

                    <LoadMore />
                </div>
            )}
        </div>
    );
};

export default OrdersTable;