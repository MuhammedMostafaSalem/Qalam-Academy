"use client";

import Link from "next/link";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi2";
import { useLanguage } from "@/providers/LanguageProvider";

export default function PaymentResultCard({ success, message, cancelled = false }) {
    const { language } = useLanguage();
    const isEnglish = language === "en";
    const Icon = success ? HiOutlineCheckCircle : HiOutlineExclamationCircle;

    const title = cancelled
        ? (isEnglish ? "Payment cancelled" : "تم إلغاء الدفع")
        : success
            ? (isEnglish ? "Payment completed" : "تم الدفع بنجاح")
            : (isEnglish ? "Payment could not be confirmed" : "تعذر تأكيد الدفع");

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
            <section className="glass w-full max-w-lg rounded-3xl border border-border p-8 text-center shadow-xl">
                <Icon className={`mx-auto mb-4 ${success ? "text-success" : "text-warning"}`} size={64} />
                <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
                <p className="mt-3 text-text-secondary">{message}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/user/orders" className="gradient-button rounded-xl px-5 py-3 font-semibold text-white">
                        {isEnglish ? "View my orders" : "عرض طلباتي"}
                    </Link>
                    <Link href={cancelled ? "/cart" : "/"} className="rounded-xl border border-border px-5 py-3 font-semibold text-text-primary hover:border-primary">
                        {cancelled ? (isEnglish ? "Return to cart" : "العودة إلى السلة") : (isEnglish ? "Back to home" : "العودة للرئيسية")}
                    </Link>
                </div>
            </section>
        </main>
    );
}
