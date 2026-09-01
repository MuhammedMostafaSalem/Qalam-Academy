import CartView from "@/components/cart/CartView";

import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/cart",
        title: {
            ar: "سلة الشراء",
            en: "Shopping Cart",
        },
        description: {
            ar: "مراجعة وإتمام طلبك في أكاديمية قلم",
            en: "Review and complete your purchase on Qalam Academy",
        },
        noIndex: true,
    });
}

export default function CartPage() {
    return <CartView />;
}
