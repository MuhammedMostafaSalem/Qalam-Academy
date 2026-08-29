import { verifyPaypalPaymentAction } from "@/actions/orderActions";
import PaymentResultCard from "@/components/payment/PaymentResultCard";

export default async function PayPalSuccessPage({ searchParams }) {
    const params = await searchParams;
    const orderId = params?.orderId;

    if (!orderId) {
        return <PaymentResultCard success={false} message="PayPal returned without an order ID." />;
    }

    const result = await verifyPaypalPaymentAction(orderId);
    return <PaymentResultCard success={result.success} message={result.message} />;
}
