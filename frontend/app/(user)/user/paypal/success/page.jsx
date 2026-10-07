"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { verifyPaypalPaymentAction } from "@/actions/orderActions";

import Container from "@/components/ui/Container";
import Section from "@/components/sections/Section";

import {
    HiOutlineCheckCircle,
    HiOutlineXCircle,
    HiOutlineArrowPath,
} from "react-icons/hi2";

import { useLanguage } from "@/providers/LanguageProvider";

export default function PayPalSuccessPage() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const { language } = useLanguage();

    const isEn = language === "en";

    const [status, setStatus] = useState(
        "processing"
    );

    const [message, setMessage] = useState("");

    const hasVerified = useRef(false);

    useEffect(() => {
        if (hasVerified.current) {
            return;
        }

        hasVerified.current = true;

        const verifyPayment = async () => {
            /*
             * Internal Qalam Order ID
             */
            const orderId =
                searchParams.get("orderId");

            /*
             * PayPal Order ID
             *
             * PayPal automatically sends it
             * as "token" in the return URL.
             */
            const paypalOrderId =
                searchParams.get("token");

            /*
             * Validate URL parameters
             */
            if (!orderId || !paypalOrderId) {
                setStatus("error");

                setMessage(
                    isEn
                        ? "Invalid PayPal payment information."
                        : "بيانات عملية الدفع عبر PayPal غير صالحة."
                );

                return;
            }

            setStatus("processing");

            try {
                const result =
                    await verifyPaypalPaymentAction(
                        orderId,
                        paypalOrderId
                    );

                console.log("PayPal Verification Result:", result);

                if (result.success) {
                    setStatus("success");

                    setMessage(
                        isEn
                            ? "Your payment has been completed successfully."
                            : "تم إتمام عملية الدفع بنجاح."
                    );

                    setTimeout(() => {
                        router.push(
                            "/user/orders"
                        );
                    }, 2000);

                    return;
                }

                setStatus("error");

                setMessage(
                    result.message ||
                        (isEn
                            ? "Failed to verify your PayPal payment."
                            : "فشل تأكيد عملية الدفع عبر PayPal.")
                );
            } catch (error) {
                console.error(
                    "PayPal verification error:",
                    error
                );

                setStatus("error");

                setMessage(
                    isEn
                        ? "Something went wrong while confirming your payment."
                        : "حدث خطأ أثناء تأكيد عملية الدفع."
                );
            }
        };

        verifyPayment();
    }, [
        searchParams,
        router,
        isEn,
    ]);

    return (
        <Section className="min-h-[70vh] py-20 flex items-center">
            <Container>
                <div className="max-w-xl mx-auto">
                    <div className="glass rounded-[28px] p-8 md:p-12 text-center space-y-6">

                        {/* =====================================================
                            PROCESSING
                        ====================================================== */}

                        {status === "processing" && (
                            <>
                                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                                    <HiOutlineArrowPath
                                        size={42}
                                        className="animate-spin"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                                        {isEn
                                            ? "Confirming Payment..."
                                            : "جاري تأكيد الدفع..."}
                                    </h1>

                                    <p className="text-text-secondary leading-relaxed">
                                        {isEn
                                            ? "Please wait while we confirm your PayPal payment."
                                            : "برجاء الانتظار بينما نقوم بتأكيد عملية الدفع عبر PayPal."}
                                    </p>
                                </div>
                            </>
                        )}

                        {/* =====================================================
                            SUCCESS
                        ====================================================== */}

                        {status === "success" && (
                            <>
                                <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                                    <HiOutlineCheckCircle
                                        size={48}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                                        {isEn
                                            ? "Payment Successful!"
                                            : "تم الدفع بنجاح!"}
                                    </h1>

                                    <p className="text-text-secondary leading-relaxed">
                                        {message}
                                    </p>
                                </div>

                                <p className="text-xs text-text-muted">
                                    {isEn
                                        ? "Redirecting you to your orders..."
                                        : "جاري تحويلك إلى طلباتك..."}
                                </p>
                            </>
                        )}

                        {/* =====================================================
                            ERROR
                        ====================================================== */}

                        {status === "error" && (
                            <>
                                <div className="w-20 h-20 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
                                    <HiOutlineXCircle
                                        size={48}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                                        {isEn
                                            ? "Payment Verification Failed"
                                            : "فشل تأكيد الدفع"}
                                    </h1>

                                    <p className="text-text-secondary leading-relaxed">
                                        {message}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.push(
                                                "/user/orders"
                                            )
                                        }
                                        className="px-5 py-3 rounded-xl border border-border text-text-primary hover:bg-card-hover transition"
                                    >
                                        {isEn
                                            ? "View My Orders"
                                            : "عرض طلباتي"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.push(
                                                "/cart"
                                            )
                                        }
                                        className="px-5 py-3 rounded-xl gradient-button text-white"
                                    >
                                        {isEn
                                            ? "Back to Cart"
                                            : "العودة للسلة"}
                                    </button>

                                </div>
                            </>
                        )}

                    </div>
                </div>
            </Container>
        </Section>
    );
}