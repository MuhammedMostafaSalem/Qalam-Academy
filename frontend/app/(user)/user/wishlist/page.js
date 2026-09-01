import WishlistClientView from "@/components/user/dashboard/wishlist/WishlistClientView";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/user/wishlist",
        title: {
            ar: "قائمة المفضلة",
            en: "My Wishlist",
        },
        description: {
            ar: "استعرض الكورسات والمنتجات المحفوظة في قائمة أمنياتك في أكاديمية قلم.",
            en: "View saved courses and resources in your Qalam Academy wishlist.",
        },
        noIndex: true,
    });
}

export default function WishlistPage() {
    return <WishlistClientView />;
}