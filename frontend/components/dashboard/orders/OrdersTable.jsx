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
import DeleteModal from "@/components/ui/modal/DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import { HiOutlineEye, HiOutlineCheckCircle, HiOutlineXMark } from "react-icons/hi2";
import { approveCashOrderAction } from "@/actions/orderActions";


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
    const { requestDelete } = useDeleteModal();
    const [approvingId, setApprovingId] = useState(null);
    const [selectedProof, setSelectedProof] = useState(null);

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

    const handleApproveCash = async (orderId) => {
      setApprovingId(orderId);

      const result = await approveCashOrderAction(orderId);

      if (result.success) {
          successMessage(
              result.message ||
              (isEn ? "Cash payment approved successfully" : "تم اعتماد الدفع الكاش بنجاح")
          );

          refetch();
      } else {
          errorMessage(
              result.message ||
              (isEn ? "Failed to approve payment" : "فشل اعتماد الدفع")
          );
      }

      setApprovingId(null);
  };


    const handleCancel = async (orderId) => {
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

    const handleCancelRequest = (orderId) => {
        requestDelete({
            itemId: orderId,
            title: isEn ? "Cancel Order" : "إلغاء الطلب",
            message: isEn ? "Are you sure you want to cancel this order?" : "هل أنت متأكد من إلغاء هذا الطلب؟",
            confirmLabel: isEn ? "Cancel Order" : "تأكيد الإلغاء",
        });
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
                                          <div className="flex flex-col gap-2">
                                              <span>
                                                  {PAYMENT_MAP[order.paymentMethodType] || order.paymentMethodType}
                                              </span>

                                              {order.paymentMethodType === "cash" && (
                                                  <div className="flex items-center gap-2">
                                                      {order.paymentProofImage && (
                                                          <button
                                                              type="button"
                                                              onClick={() => setSelectedProof(order.paymentProofImage)}
                                                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                                                                        bg-primary/10 text-primary hover:bg-primary/20 transition
                                                                        text-xs font-semibold"
                                                          >
                                                              <HiOutlineEye size={16} />
                                                              {isEn ? "View Proof" : "عرض الإيصال"}
                                                          </button>
                                                      )}
                                                  </div>
                                              )}
                                          </div>
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

                                        {/* {!isInstructor && (
                                            <Table.Td>
                                                <ActionsTable
                                                    actions={
                                                        <div className="flex gap-3 justify-center items-center text-[20px]">
                                                            {order.status !== "paid" && (
                                                                <div
                                                                    className="text-error cursor-pointer"
                                                                    onClick={() => handleCancelRequest(order._id)}
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
                                        )} */}

                                        {!isInstructor && (
                                          <Table.Td>
                                              {order.paymentMethodType === "cash" && order.status === "pending" ? (
                                                  <button
                                                      type="button"
                                                      disabled={approvingId === order._id}
                                                      onClick={() => handleApproveCash(order._id)}
                                                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl
                                                                bg-success/10 text-success hover:bg-success/20
                                                                transition text-xs font-semibold disabled:opacity-50"
                                                  >
                                                      <HiOutlineCheckCircle size={17} />

                                                      {approvingId === order._id
                                                          ? (isEn ? "Approving..." : "جاري الاعتماد...")
                                                          : (isEn ? "Approve Payment" : "اعتماد الدفع")
                                                      }
                                                  </button>
                                              ) : (
                                                  <span className="text-xs text-text-muted">—</span>
                                              )}
                                          </Table.Td>
                                      )}

                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>

                    {meta?.hasMore && <LoadMore />}
                    {selectedProof && (
                      <div
                          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm
                                    flex items-center justify-center p-4"
                          onClick={() => setSelectedProof(null)}
                      >
                          <div
                              className="relative max-w-4xl max-h-[90vh] w-full
                                        bg-background rounded-2xl p-4 shadow-2xl"
                              onClick={(e) => e.stopPropagation()}
                          >
                              <button
                                  type="button"
                                  onClick={() => setSelectedProof(null)}
                                  className="absolute -top-3 -right-3 z-10 w-9 h-9
                                            rounded-full bg-error text-white flex items-center
                                            justify-center shadow-lg hover:bg-error/90 transition"
                              >
                                  <HiOutlineXMark size={22} />
                              </button>

                              <div className="relative w-full h-[75vh]">
                                  <img
                                      src={
                                          selectedProof.startsWith("http")
                                              ? selectedProof
                                              : `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}${selectedProof}`
                                      }
                                      alt={isEn ? "Payment Proof" : "إثبات الدفع"}
                                      className="w-full h-full object-contain rounded-xl"
                                  />
                              </div>
                          </div>
                      </div>
                  )}

                    <DeleteModal onConfirmAction={handleCancel} />
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
