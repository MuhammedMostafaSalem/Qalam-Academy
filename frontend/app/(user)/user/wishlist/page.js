import PageHeader from "@/components/dashboard/PageHeader";
import WishlistGrid from "@/components/user/dashboard/wishlist/WishlistGrid";

export default function WishlistPage() {
    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
                space-y-6
            "
        >
            <PageHeader
                title="المفضلة"
                description="الكورسات التي حفظتها للعودة إليها لاحقاً"
            />

            <WishlistGrid />
        </div>
    );
}