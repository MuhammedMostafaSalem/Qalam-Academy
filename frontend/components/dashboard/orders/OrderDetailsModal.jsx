"use client";

import { useEffect, useState } from "react";

import {
    HiOutlineXMark,
    HiOutlineEye,
    HiOutlineDocumentText,
    HiOutlineUser,
    HiOutlineCreditCard,
    HiOutlinePhoto,
    HiOutlineCheckCircle,
    HiOutlineXCircle,
} from "react-icons/hi2";

import {
    getOrderByIdAction,
    approveCashOrderAction,
    rejectCashOrderAction,
} from "@/actions/orderActions";

import { useLanguage } from "@/providers/LanguageProvider";
import useToast from "@/hooks/useToast";


export default function OrderDetailsModal({
    orderId,
    open,
    onClose,
}) {
    const { language } = useLanguage();

    const isEn = language === "en";

    const {
        successMessage,
        errorMessage,
    } = useToast();


    const [order, setOrder] = useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    const [showProof, setShowProof] =
        useState(false);

    const [approving, setApproving] =
        useState(false);

    const [rejecting, setRejecting] =
        useState(false);

    const [rejectionReason, setRejectionReason] =
        useState("");


    // ========================================================
    // LOAD ORDER
    // ========================================================

    useEffect(() => {
        if (!open || !orderId) {
            setOrder(null);
            setError(null);
            setShowProof(false);

            return;
        }

        const fetchOrder = async () => {
            setLoading(true);
            setError(null);

            try {
                const result =
                    await getOrderByIdAction(
                        orderId
                    );

                if (result.success) {
                    setOrder(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError(
                    err?.message ||
                        (
                            isEn
                                ? "Failed to load order"
                                : "فشل تحميل تفاصيل الطلب"
                        )
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [
        open,
        orderId,
        isEn,
    ]);


    if (!open) {
        return null;
    }


    const user = order?.user;


    // ========================================================
    // PAYMENT PROOF
    // ========================================================

    const paymentProof =
        order?.paymentProofImage ||
        order?.paymentProof?.url ||
        order?.paymentProof?.path ||
        order?.paymentProofUrl ||
        (
            typeof order?.paymentProof ===
            "string"
                ? order.paymentProof
                : null
        );


    const getFullUrl = (url) => {
        if (
            !url ||
            typeof url !== "string"
        ) {
            return null;
        }

        if (
            url.startsWith("http")
        ) {
            return url;
        }

        const baseUrl =
            process.env
                .NEXT_PUBLIC_BASE_URL ||
            "http://localhost:5000";


        // If backend returns
        // /uploads/...
        if (
            url.startsWith(
                "/uploads/"
            )
        ) {
            return `${baseUrl}${url}`;
        }


        // paymentProofImage contains
        // filename only
        return `${baseUrl}/uploads/orders-proofs/${url}`;
    };


    const proofUrl =
        getFullUrl(paymentProof);


    // ========================================================
    // STATUS
    // ========================================================

    const statusMap = {
        pending: {
            label: isEn
                ? "Pending"
                : "قيد الانتظار",

            className:
                "bg-warning/20 text-warning",
        },

        paid: {
            label: isEn
                ? "Paid"
                : "مدفوع",

            className:
                "bg-success/20 text-success",
        },

        cancelled: {
            label: isEn
                ? "Cancelled"
                : "ملغى",

            className:
                "bg-error/20 text-error",
        },
    };


    const status =
        statusMap[
            order?.status
        ] || {
            label:
                order?.status ||
                "—",

            className:
                "bg-card-hover text-text-secondary",
        };


    // ========================================================
    // PAYMENT STATUS
    // ========================================================

    const paymentStatusKey =
        order?.isPaid
            ? "paid"
            : order?.status ===
                "cancelled"
            ? "rejected"
            : "pending";


    const paymentStatusMap = {
        pending: {
            label: isEn
                ? "Payment Pending"
                : "الدفع قيد الانتظار",

            className:
                "bg-warning/20 text-warning",
        },

        paid: {
            label: isEn
                ? "Paid"
                : "مدفوع",

            className:
                "bg-success/20 text-success",
        },

        rejected: {
            label: isEn
                ? "Rejected"
                : "مرفوض",

            className:
                "bg-error/20 text-error",
        },
    };


    const paymentStatus =
        paymentStatusMap[
            paymentStatusKey
        ];


    // ========================================================
    // PAYMENT METHOD
    // ========================================================

    const paymentMethodMap = {
        cash: isEn
            ? "Cash / Manual Transfer"
            : "نقدي / تحويل يدوي",

        card: isEn
            ? "Credit Card"
            : "بطاقة ائتمان",

        wallet: isEn
            ? "E-Wallet"
            : "محفظة إلكترونية",

        fawry: isEn
            ? "Fawry"
            : "فوري",

        paypal: "PayPal",
    };


    // ========================================================
    // APPROVE CASH ORDER
    // ========================================================

    const handleApproveCashOrder =
        async () => {
            if (!order?._id) {
                return;
            }

            if (!proofUrl) {
                errorMessage(
                    isEn
                        ? "Payment proof is missing"
                        : "صورة إثبات الدفع غير موجودة"
                );

                return;
            }

            setApproving(true);

            try {
                const result =
                    await approveCashOrderAction(
                        order._id
                    );

                if (result.success) {
                    successMessage(
                        result.message ||
                            (
                                isEn
                                    ? "Payment approved successfully"
                                    : "تم اعتماد الدفع بنجاح"
                            )
                    );

                    setOrder(
                        result.data
                    );

                    setShowProof(false);
                } else {
                    errorMessage(
                        result.message ||
                            (
                                isEn
                                    ? "Failed to approve payment"
                                    : "فشل اعتماد الدفع"
                            )
                    );
                }
            } catch (err) {
                errorMessage(
                    isEn
                        ? "Something went wrong"
                        : "حدث خطأ غير متوقع"
                );
            } finally {
                setApproving(false);
            }
        };


    // ========================================================
    // REJECT CASH ORDER
    // ========================================================

    const handleRejectCashOrder =
        async () => {
            if (!order?._id) {
                return;
            }

            const reason =
                rejectionReason.trim();

            if (!reason) {
                errorMessage(
                    isEn
                        ? "Please enter rejection reason"
                        : "برجاء كتابة سبب رفض الدفع"
                );

                return;
            }

            setRejecting(true);

            try {
                const result =
                    await rejectCashOrderAction(
                        order._id,
                        reason
                    );

                if (result.success) {
                    successMessage(
                        result.message ||
                            (
                                isEn
                                    ? "Payment rejected successfully"
                                    : "تم رفض الدفع بنجاح"
                            )
                    );

                    setOrder(
                        result.data
                    );

                    setRejectionReason("");

                    setShowProof(false);
                } else {
                    errorMessage(
                        result.message ||
                            (
                                isEn
                                    ? "Failed to reject payment"
                                    : "فشل رفض الدفع"
                            )
                    );
                }
            } catch (err) {
                errorMessage(
                    isEn
                        ? "Something went wrong"
                        : "حدث خطأ غير متوقع"
                );
            } finally {
                setRejecting(false);
            }
        };


    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />


            {/* Modal */}
            <div
                className="
                    relative
                    w-full
                    max-w-4xl
                    max-h-[90vh]
                    overflow-y-auto
                    glass
                    rounded-3xl
                    border
                    border-border
                    shadow-2xl
                    z-10
                "
            >

                {/* Header */}
                <div
                    className="
                        sticky
                        top-0
                        z-20
                        flex
                        items-center
                        justify-between
                        gap-4
                        p-5
                        border-b
                        border-border
                        bg-card/95
                        backdrop-blur
                    "
                >
                    <div>

                        <h2 className="text-xl font-bold text-text-primary">
                            {isEn
                                ? "Order Details"
                                : "تفاصيل الطلب"}
                        </h2>

                        {order?._id && (
                            <p className="mt-1 text-xs font-mono text-text-muted">
                                #{order._id}
                            </p>
                        )}

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            p-2
                            rounded-xl
                            text-text-secondary
                            hover:text-text-primary
                            hover:bg-card-hover
                            transition
                        "
                    >
                        <HiOutlineXMark
                            size={24}
                        />
                    </button>

                </div>


                {/* Loading */}
                {loading && (
                    <div className="py-20 text-center text-text-secondary">
                        {isEn
                            ? "Loading order details..."
                            : "جاري تحميل تفاصيل الطلب..."}
                    </div>
                )}


                {/* Error */}
                {!loading && error && (
                    <div className="py-20 text-center text-error">
                        {error}
                    </div>
                )}


                {/* Content */}
                {!loading &&
                    !error &&
                    order && (
                        <div className="p-5 space-y-6">

                            {/* ================================================= */}
                            {/* BASIC INFORMATION */}
                            {/* ================================================= */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Order */}
                                <div className="rounded-2xl border border-border bg-card-hover p-4">

                                    <div className="flex items-center gap-2 mb-3">

                                        <HiOutlineDocumentText className="text-primary" />

                                        <h3 className="font-semibold text-text-primary">
                                            {isEn
                                                ? "Order Information"
                                                : "بيانات الطلب"}
                                        </h3>

                                    </div>


                                    <div className="space-y-3 text-sm">

                                        <div className="flex justify-between gap-4">

                                            <span className="text-text-secondary">
                                                {isEn
                                                    ? "Order ID"
                                                    : "رقم الطلب"}
                                            </span>

                                            <span className="font-mono text-text-primary text-xs">
                                                #
                                                {order._id
                                                    ?.slice(-8)
                                                    ?.toUpperCase()}
                                            </span>

                                        </div>


                                        <div className="flex justify-between gap-4">

                                            <span className="text-text-secondary">
                                                {isEn
                                                    ? "Status"
                                                    : "الحالة"}
                                            </span>

                                            <span
                                                className={`
                                                    px-2.5
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    ${status.className}
                                                `}
                                            >
                                                {status.label}
                                            </span>

                                        </div>


                                        <div className="flex justify-between gap-4">

                                            <span className="text-text-secondary">
                                                {isEn
                                                    ? "Order Date"
                                                    : "تاريخ الطلب"}
                                            </span>

                                            <span className="text-text-primary">
                                                {order.createdAt
                                                    ? new Date(
                                                        order.createdAt
                                                    ).toLocaleString(
                                                        isEn
                                                            ? "en-US"
                                                            : "ar-EG"
                                                    )
                                                    : "—"}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* Customer */}
                                <div className="rounded-2xl border border-border bg-card-hover p-4">

                                    <div className="flex items-center gap-2 mb-3">

                                        <HiOutlineUser className="text-primary" />

                                        <h3 className="font-semibold text-text-primary">
                                            {isEn
                                                ? "Customer"
                                                : "العميل"}
                                        </h3>

                                    </div>


                                    <div className="space-y-3 text-sm">

                                        <div className="flex justify-between gap-4">

                                            <span className="text-text-secondary">
                                                {isEn
                                                    ? "Name"
                                                    : "الاسم"}
                                            </span>

                                            <span className="text-text-primary font-medium">
                                                {user
                                                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                                                    : "—"}
                                            </span>

                                        </div>


                                        <div className="flex justify-between gap-4">

                                            <span className="text-text-secondary">
                                                {isEn
                                                    ? "Email"
                                                    : "البريد"}
                                            </span>

                                            <span className="text-text-primary break-all">
                                                {user?.email ||
                                                    "—"}
                                            </span>

                                        </div>


                                        {user?.phone && (
                                            <div className="flex justify-between gap-4">

                                                <span className="text-text-secondary">
                                                    {isEn
                                                        ? "Phone"
                                                        : "الهاتف"}
                                                </span>

                                                <span className="text-text-primary">
                                                    {user.phone}
                                                </span>

                                            </div>
                                        )}

                                    </div>

                                </div>

                            </div>


                            {/* ================================================= */}
                            {/* PAYMENT */}
                            {/* ================================================= */}

                            <div className="rounded-2xl border border-border bg-card-hover p-4">

                                <div className="flex items-center gap-2 mb-4">

                                    <HiOutlineCreditCard className="text-primary" />

                                    <h3 className="font-semibold text-text-primary">
                                        {isEn
                                            ? "Payment Information"
                                            : "بيانات الدفع"}
                                    </h3>

                                </div>


                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                    <div>

                                        <p className="text-xs text-text-muted mb-1">
                                            {isEn
                                                ? "Payment Method"
                                                : "طريقة الدفع"}
                                        </p>

                                        <p className="text-sm font-semibold text-text-primary">
                                            {
                                                paymentMethodMap[
                                                    order.paymentMethodType
                                                ] ||
                                                order.paymentMethodType ||
                                                "—"
                                            }
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-xs text-text-muted mb-1">
                                            {isEn
                                                ? "Payment Status"
                                                : "حالة الدفع"}
                                        </p>

                                        <span
                                            className={`
                                                inline-flex
                                                px-2.5
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                ${paymentStatus.className}
                                            `}
                                        >
                                            {
                                                paymentStatus.label
                                            }
                                        </span>

                                    </div>


                                    <div>

                                        <p className="text-xs text-text-muted mb-1">
                                            {isEn
                                                ? "Order Total"
                                                : "إجمالي الطلب"}
                                        </p>

                                        <p className="text-lg font-bold text-primary">

                                            {order.totalOrderPrice?.toLocaleString(
                                                isEn
                                                    ? "en-US"
                                                    : "ar-EG"
                                            )}{" "}

                                            {isEn
                                                ? "EGP"
                                                : "ج.م"}

                                        </p>

                                    </div>

                                </div>


                                {/* Rejection Reason */}
                                {order.paymentRejectionReason && (
                                    <div className="mt-4 rounded-xl border border-error/20 bg-error/10 p-4">

                                        <p className="text-xs text-error mb-1">
                                            {isEn
                                                ? "Rejection Reason"
                                                : "سبب رفض الدفع"}
                                        </p>

                                        <p className="text-sm text-text-primary">
                                            {
                                                order.paymentRejectionReason
                                            }
                                        </p>

                                    </div>
                                )}

                            </div>


                            {/* ================================================= */}
                            {/* CASH PAYMENT PROOF */}
                            {/* ================================================= */}

                            {order.paymentMethodType ===
                                "cash" && (

                                <div className="rounded-2xl border border-border bg-card-hover p-4">

                                    <div className="flex items-center gap-2 mb-4">

                                        <HiOutlinePhoto className="text-primary" />

                                        <h3 className="font-semibold text-text-primary">
                                            {isEn
                                                ? "Payment Proof"
                                                : "إثبات الدفع"}
                                        </h3>

                                    </div>


                                    {proofUrl ? (

                                        <div className="space-y-4">

                                            {/* Proof Actions */}
                                            <div className="flex flex-wrap gap-3">

                                                {/* View */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowProof(
                                                            true
                                                        )
                                                    }
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-4
                                                        py-2.5
                                                        rounded-xl
                                                        bg-primary
                                                        text-white
                                                        hover:opacity-90
                                                        transition
                                                    "
                                                >

                                                    <HiOutlineEye
                                                        size={18}
                                                    />

                                                    {isEn
                                                        ? "View Payment Proof"
                                                        : "عرض إثبات الدفع"}

                                                </button>


                                                {/* New Tab */}
                                                <a
                                                    href={proofUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-4
                                                        py-2.5
                                                        rounded-xl
                                                        border
                                                        border-border
                                                        text-text-primary
                                                        hover:bg-card-hover
                                                        transition
                                                    "
                                                >
                                                    {isEn
                                                        ? "Open in New Tab"
                                                        : "فتح في تبويب جديد"}
                                                </a>


                                                {/* APPROVE */}
                                                {order.status ===
                                                    "pending" &&
                                                    !order.isPaid && (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleApproveCashOrder
                                                            }
                                                            disabled={
                                                                approving ||
                                                                rejecting
                                                            }
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-2
                                                                px-4
                                                                py-2.5
                                                                rounded-xl
                                                                bg-success
                                                                text-white
                                                                hover:opacity-90
                                                                transition
                                                                disabled:opacity-50
                                                                disabled:cursor-not-allowed
                                                            "
                                                        >

                                                            <HiOutlineCheckCircle
                                                                size={18}
                                                            />

                                                            {approving
                                                                ? (
                                                                    isEn
                                                                        ? "Approving..."
                                                                        : "جاري الاعتماد..."
                                                                )
                                                                : (
                                                                    isEn
                                                                        ? "Approve Payment"
                                                                        : "اعتماد الدفع"
                                                                )}

                                                        </button>
                                                    )}

                                            </div>


                                            {/* ================================================= */}
                                            {/* REJECTION */}
                                            {/* ================================================= */}

                                            {order.status ===
                                                "pending" &&
                                                !order.isPaid && (

                                                <div className="border-t border-border pt-4">

                                                    <p className="text-sm font-semibold text-text-primary mb-2">
                                                        {isEn
                                                            ? "Reject Payment"
                                                            : "رفض الدفع"}
                                                    </p>


                                                    <textarea
                                                        value={
                                                            rejectionReason
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setRejectionReason(
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder={
                                                            isEn
                                                                ? "Enter rejection reason..."
                                                                : "اكتب سبب رفض إثبات الدفع..."
                                                        }
                                                        rows={3}
                                                        disabled={
                                                            rejecting ||
                                                            approving
                                                        }
                                                        className="
                                                            w-full
                                                            rounded-xl
                                                            border
                                                            border-border
                                                            bg-background
                                                            text-text-primary
                                                            placeholder:text-text-muted
                                                            p-3
                                                            text-sm
                                                            outline-none
                                                            focus:border-error
                                                            resize-none
                                                        "
                                                    />


                                                    <div className="mt-3 flex justify-end">

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleRejectCashOrder
                                                            }
                                                            disabled={
                                                                rejecting ||
                                                                approving ||
                                                                !rejectionReason.trim()
                                                            }
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-2
                                                                px-4
                                                                py-2.5
                                                                rounded-xl
                                                                bg-error
                                                                text-white
                                                                hover:opacity-90
                                                                transition
                                                                disabled:opacity-50
                                                                disabled:cursor-not-allowed
                                                            "
                                                        >

                                                            <HiOutlineXCircle
                                                                size={18}
                                                            />

                                                            {rejecting
                                                                ? (
                                                                    isEn
                                                                        ? "Rejecting..."
                                                                        : "جاري الرفض..."
                                                                )
                                                                : (
                                                                    isEn
                                                                        ? "Reject Payment"
                                                                        : "رفض الدفع"
                                                                )}

                                                        </button>

                                                    </div>

                                                </div>
                                            )}

                                        </div>

                                    ) : (

                                        <div className="rounded-xl border border-warning/20 bg-warning/10 p-4">

                                            <p className="text-sm text-warning">

                                                {isEn
                                                    ? "No payment proof has been uploaded yet."
                                                    : "لم يتم رفع إثبات دفع حتى الآن."}

                                            </p>

                                        </div>
                                    )}

                                </div>
                            )}


                            {/* ================================================= */}
                            {/* ORDER ITEMS */}
                            {/* ================================================= */}

                            {Array.isArray(
                                order.cartItems
                            ) &&
                                order.cartItems
                                    .length > 0 && (

                                <div className="rounded-2xl border border-border bg-card-hover p-4">

                                    <div className="flex items-center gap-2 mb-4">

                                        <HiOutlineDocumentText className="text-primary" />

                                        <h3 className="font-semibold text-text-primary">
                                            {isEn
                                                ? "Order Items"
                                                : "منتجات الطلب"}
                                        </h3>

                                    </div>


                                    <div className="space-y-3">

                                        {order.cartItems.map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <div
                                                    key={
                                                        item._id ||
                                                        item.id ||
                                                        index
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        gap-4
                                                        p-3
                                                        rounded-xl
                                                        border
                                                        border-border
                                                    "
                                                >

                                                    <div>

                                                        <p className="font-medium text-sm text-text-primary">

                                                            {
                                                                item.item?.title ||
                                                                item.title ||
                                                                item.name ||
                                                                "—"
                                                            }

                                                        </p>


                                                        {item.count && (
                                                            <p className="text-xs text-text-muted mt-1">

                                                                {isEn
                                                                    ? `Quantity: ${item.count}`
                                                                    : `الكمية: ${item.count}`}

                                                            </p>
                                                        )}

                                                    </div>


                                                    <span className="font-semibold text-primary">

                                                        {item.price?.toLocaleString(
                                                            isEn
                                                                ? "en-US"
                                                                : "ar-EG"
                                                        )}{" "}

                                                        {isEn
                                                            ? "EGP"
                                                            : "ج.م"}

                                                    </span>

                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                        </div>
                    )}
            </div>


            {/* ======================================================== */}
            {/* PROOF PREVIEW */}
            {/* ======================================================== */}

            {showProof &&
                proofUrl && (

                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-black/80"
                        onClick={() =>
                            setShowProof(false)
                        }
                    />


                    <div className="relative z-10 max-w-5xl max-h-[90vh] w-full flex items-center justify-center">

                        <button
                            type="button"
                            onClick={() =>
                                setShowProof(false)
                            }
                            className="
                                absolute
                                -top-12
                                end-0
                                p-2
                                rounded-xl
                                bg-black/50
                                text-white
                                hover:bg-black/70
                            "
                        >
                            <HiOutlineXMark
                                size={24}
                            />
                        </button>


                        <img
                            src={proofUrl}
                            alt={
                                isEn
                                    ? "Payment proof"
                                    : "إثبات الدفع"
                            }
                            className="
                                max-w-full
                                max-h-[85vh]
                                object-contain
                                rounded-2xl
                                shadow-2xl
                            "
                        />

                    </div>

                </div>
            )}
        </div>
    );
}
