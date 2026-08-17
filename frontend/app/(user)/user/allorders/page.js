import { redirect } from "next/navigation";

export default async function AllOrdersRedirectPage({ searchParams }) {
    const params = await searchParams;
    const orderId = params?.orderId;
    if (orderId) {
        redirect(`/user/orders?orderId=${orderId}`);
    }
    redirect("/user/orders");
}
