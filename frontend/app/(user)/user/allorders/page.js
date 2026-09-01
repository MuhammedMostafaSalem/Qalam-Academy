import { redirect } from "next/navigation";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/allorders",
        title: {
            ar: "سجل الطلبات",
            en: "All Orders",
        },
        noIndex: true,
    });
}

export default async function AllOrdersRedirectPage({ searchParams }) {
    const params = await searchParams;
    const orderId = params?.orderId;
    if (orderId) {
        redirect(`/user/orders?orderId=${orderId}`);
    }
    redirect("/user/orders");
}
