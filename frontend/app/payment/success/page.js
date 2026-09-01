import { verifyPaypalPaymentAction } from "@/actions/orderActions";
import PaymentResultCard from "@/components/payment/PaymentResultCard";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/payment/success",
        title: {
            ar: "تمت عملية الدفع بنجاح",
            en: "Payment Successful",
        },
        noIndex: true,
    });
}

export default async function PayPalSuccessPage({ searchParams }) {
    const params = await searchParams;
    const orderId = params?.orderId;

    if (!orderId) {
        return <PaymentResultCard success={false} message="PayPal returned without an order ID." />;
    }

    const result = await verifyPaypalPaymentAction(orderId);
    return <PaymentResultCard success={result.success} message={result.message} />;
}
