"use client";

import { useRouter } from "next/navigation";

import Container from "@/components/ui/Container";
import Section from "@/components/sections/Section";
import Button from "@/components/ui/Button";

import { HiOutlineXCircle } from "react-icons/hi2";

import { useLanguage } from "@/providers/LanguageProvider";

export default function PayPalCancelPage() {
    const router = useRouter();

    const { language } = useLanguage();

    const isEn = language === "en";

    return (
        <Section className="min-h-[70vh] py-20 flex items-center">
            <Container>
                <div className="max-w-xl mx-auto">
                    <div className="glass rounded-[28px] p-8 md:p-12 text-center space-y-6">

                        {/* =====================================================
                            ICON
                        ====================================================== */}

                        <div className="w-20 h-20 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto">
                            <HiOutlineXCircle
                                size={48}
                            />
                        </div>

                        {/* =====================================================
                            MESSAGE
                        ====================================================== */}

                        <div className="space-y-2">

                            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                                {isEn
                                    ? "Payment Cancelled"
                                    : "تم إلغاء عملية الدفع"}
                            </h1>

                            <p className="text-text-secondary leading-relaxed">
                                {isEn
                                    ? "Your PayPal payment was cancelled. Your order is still available and you can try again."
                                    : "تم إلغاء عملية الدفع عبر PayPal. طلبك ما زال موجودًا ويمكنك المحاولة مرة أخرى."}
                            </p>

                        </div>

                        {/* =====================================================
                            ACTIONS
                        ====================================================== */}

                        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">

                            <Button
                                onClick={() =>
                                    router.push(
                                        "/cart"
                                    )
                                }
                                className="gradient-button"
                            >
                                {isEn
                                    ? "Back to Cart"
                                    : "العودة للسلة"}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    router.push(
                                        "/user/orders"
                                    )
                                }
                            >
                                {isEn
                                    ? "My Orders"
                                    : "طلباتي"}
                            </Button>

                        </div>

                    </div>
                </div>
            </Container>
        </Section>
    );
}