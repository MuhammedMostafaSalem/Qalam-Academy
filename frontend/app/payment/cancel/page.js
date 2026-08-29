import { cancelOrderAction } from "@/actions/orderActions";
import PaymentResultCard from "@/components/payment/PaymentResultCard";

export default async function PayPalCancelPage({ searchParams }) {
    const params = await searchParams;
    const orderId = params?.orderId;
    const result = orderId
        ? await cancelOrderAction(orderId)
        : { success: true, message: "No payment was captured." };

    return (
        <PaymentResultCard
            success={false}
            cancelled
            message={result.success ? "No payment was captured." : result.message}
        />
    );
}
