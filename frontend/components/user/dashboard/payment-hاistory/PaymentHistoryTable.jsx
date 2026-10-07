"use client";

import Table from "@/components/ui/Table";
import useOrders from "@/hooks/orders/useOrders";

import { useSearchParams } from "next/navigation";

import { HiOutlineBanknotes } from "react-icons/hi2";

import { useLanguage } from "@/providers/LanguageProvider";

const PaymentHistoryTable = () => {
    const { language } = useLanguage();

    const isEn = language === "en";

    const { orders, loading, error } = useOrders();

    const searchParams = useSearchParams();

    /* =========================================================
       URL FILTERS
    ========================================================= */

    const searchQuery = (
        searchParams.get("search") || ""
    )
        .toLowerCase()
        .trim();

    const methodFilter =
        searchParams.get("method") || "all";

    const statusFilter =
        searchParams.get("status") || "all";

    /* =========================================================
       PAYMENT METHOD
    ========================================================= */

    const mapPaymentMethod = (method) => {
        switch (method) {
            case "card":
                return isEn
                    ? "Credit / Debit Card (Paymob)"
                    : "بطاقة بنكية (Paymob)";

            case "wallet":
                return isEn
                    ? "Mobile Wallet (Paymob)"
                    : "محفظة إلكترونية (Paymob)";

            case "fawry":
                return isEn
                    ? "Fawry / Aman"
                    : "فوري / أمان";

            case "cash":
                return isEn
                    ? "Cash / Manual Transfer"
                    : "دفع نقدي / تحويل يدوي";

            case "paypal":
                return isEn
                    ? "PayPal Account"
                    : "حساب بايبال (PayPal)";

            default:
                return (
                    method ||
                    (
                        isEn
                            ? "Electronic Gateway"
                            : "وسيلة إلكترونية"
                    )
                );
        }
    };

    /* =========================================================
       PAYMENT STATUS
    ========================================================= */

    const mapPaymentStatus = (
        isPaid,
        status
    ) => {
        if (
            isPaid ||
            status === "paid"
        ) {
            return {
                label: isEn
                    ? "Successful"
                    : "ناجحة",

                color:
                    "bg-success/10 text-success",
            };
        }

        switch (status) {
            case "pending":
                return {
                    label: isEn
                        ? "Pending"
                        : "قيد المعالجة",

                    color:
                        "bg-warning/10 text-warning",
                };

            case "cancelled":
                return {
                    label: isEn
                        ? "Cancelled"
                        : "ملغاة",

                    color:
                        "bg-error/10 text-error",
                };

            case "expired":
                return {
                    label: isEn
                        ? "Expired"
                        : "منتهية",

                    color:
                        "bg-card-hover text-text-secondary",
                };

            default:
                return {
                    label:
                        status ||
                        (
                            isEn
                                ? "Unknown"
                                : "غير معروف"
                        ),

                    color:
                        "bg-card-hover text-text-secondary",
                };
        }
    };

    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {
        return (
            <div className="py-12 text-center text-text-secondary">
                {isEn
                    ? "Loading payment history..."
                    : "جاري تحميل سجل المدفوعات..."}
            </div>
        );
    }

    /* =========================================================
       ERROR
    ========================================================= */

    if (error) {
        return (
            <div className="py-12 text-center text-error">
                {error}
            </div>
        );
    }

    /* =========================================================
       EMPTY
    ========================================================= */

    if (
        !orders ||
        orders.length === 0
    ) {
        return (
            <div className="py-12 text-center text-text-muted">
                {isEn
                    ? "No recorded payments yet"
                    : "لا توجد مدفوعات مسجلة حتى الآن"}
            </div>
        );
    }

    /* =========================================================
       FILTER PAYMENTS
    ========================================================= */

    const filteredOrders =
        orders.filter((order) => {

            /* ---------------------------------------------
               TRANSACTION SEARCH
            --------------------------------------------- */

            const txnId = (
                order.paymentIntentId ||
                order.transactionId ||
                order._id ||
                ""
            ).toLowerCase();

            const orderIdStr = (
                order._id || ""
            ).toLowerCase();

            const matchesSearch =
                !searchQuery ||
                txnId.includes(
                    searchQuery
                ) ||
                orderIdStr.includes(
                    searchQuery
                );

            /* ---------------------------------------------
               PAYMENT METHOD
            --------------------------------------------- */

            const method =
                order.paymentMethodType ||
                "cash";

            const matchesMethod =
                methodFilter === "all" ||
                method === methodFilter;

            /* ---------------------------------------------
               PAYMENT STATUS
            --------------------------------------------- */

            const orderStatus =
                order.status ||
                "pending";

            let matchesStatus = true;

            if (
                statusFilter === "paid"
            ) {
                matchesStatus =
                    order.isPaid ||
                    orderStatus === "paid";
            } else if (
                statusFilter === "pending"
            ) {
                matchesStatus =
                    !order.isPaid &&
                    orderStatus ===
                        "pending";
            } else if (
                statusFilter ===
                "cancelled"
            ) {
                matchesStatus =
                    orderStatus ===
                    "cancelled";
            } else if (
                statusFilter ===
                "expired"
            ) {
                matchesStatus =
                    orderStatus ===
                    "expired";
            }

            return (
                matchesSearch &&
                matchesMethod &&
                matchesStatus
            );
        });

    /* =========================================================
       NO FILTER RESULTS
    ========================================================= */

    if (
        filteredOrders.length === 0
    ) {
        return (
            <div className="py-12 text-center text-text-muted">
                {isEn
                    ? "No payment records match your filters"
                    : "لا توجد نتائج مدفوعات تطابق خيارات التصفية والبحث المختارة"}
            </div>
        );
    }

    /* =========================================================
       TABLE
    ========================================================= */

    return (
        <Table>

            {/* =================================================
                TABLE HEAD
            ================================================== */}

            <Table.Head>

                <Table.Row>

                    <Table.Th>
                        {isEn
                            ? "Transaction ID"
                            : "رقم العملية / المعاملة"}
                    </Table.Th>

                    <Table.Th>
                        {isEn
                            ? "Order Number"
                            : "رقم الطلب"}
                    </Table.Th>

                    <Table.Th>
                        {isEn
                            ? "Payment Method"
                            : "وسيلة الدفع"}
                    </Table.Th>

                    <Table.Th>
                        {isEn
                            ? "Amount"
                            : "المبلغ"}
                    </Table.Th>

                    <Table.Th>
                        {isEn
                            ? "Date"
                            : "التاريخ"}
                    </Table.Th>

                    <Table.Th>
                        {isEn
                            ? "Status"
                            : "الحالة"}
                    </Table.Th>

                </Table.Row>

            </Table.Head>

            {/* =================================================
                TABLE BODY
            ================================================== */}

            <Table.Body>

                {filteredOrders.map(
                    (order, index) => {

                        /* -----------------------------------------
                           PAYMENT METHOD
                        ----------------------------------------- */

                        const methodLabel =
                            mapPaymentMethod(
                                order.paymentMethodType
                            );

                        /* -----------------------------------------
                           PAYMENT STATUS
                        ----------------------------------------- */

                        const statusObj =
                            mapPaymentStatus(
                                order.isPaid,
                                order.status
                            );

                        /* -----------------------------------------
                           TRANSACTION ID
                        ----------------------------------------- */

                        const txnId =
                            order.paymentIntentId ||
                            order.transactionId ||
                            `TXN-${order._id
                                ?.slice(-8)
                                .toUpperCase()}`;

                        /* -----------------------------------------
                           ORDER NUMBER
                        ----------------------------------------- */

                        const orderNum =
                            `#ORD-${order._id
                                ?.slice(-6)
                                .toUpperCase()}`;

                        /* -----------------------------------------
                           DATE
                        ----------------------------------------- */

                        const dateStr =
                            order.createdAt
                                ? new Date(
                                      order.createdAt
                                  ).toLocaleDateString(
                                      isEn
                                          ? "en-US"
                                          : "ar-EG"
                                  )
                                : "—";

                        return (
                            <Table.Row
                                key={
                                    order._id ||
                                    index
                                }
                            >

                                {/* =================================
                                    TRANSACTION ID
                                ================================== */}

                                <Table.Td className="font-mono text-xs">
                                    {txnId}
                                </Table.Td>

                                {/* =================================
                                    ORDER NUMBER
                                ================================== */}

                                <Table.Td className="font-mono text-xs">
                                    {orderNum}
                                </Table.Td>

                                {/* =================================
                                    PAYMENT METHOD
                                ================================== */}

                                <Table.Td>

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <HiOutlineBanknotes
                                                size={18}
                                            />
                                        </div>

                                        <span className="text-sm font-medium">
                                            {methodLabel}
                                        </span>

                                    </div>

                                </Table.Td>

                                {/* =================================
                                    AMOUNT
                                ================================== */}

                                <Table.Td className="font-bold text-primary">
                                    {
                                        order.totalOrderPrice
                                    }{" "}
                                    {isEn
                                        ? "EGP"
                                        : "ج.م"}
                                </Table.Td>

                                {/* =================================
                                    DATE
                                ================================== */}

                                <Table.Td>
                                    {dateStr}
                                </Table.Td>

                                {/* =================================
                                    STATUS
                                ================================== */}

                                <Table.Td>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusObj.color}`}
                                    >
                                        {
                                            statusObj.label
                                        }
                                    </span>

                                </Table.Td>

                            </Table.Row>
                        );
                    }
                )}

            </Table.Body>

        </Table>
    );
};

export default PaymentHistoryTable;