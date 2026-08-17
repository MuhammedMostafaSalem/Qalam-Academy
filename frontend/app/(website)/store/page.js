import Hero from "@/components/store/hero/Hero";
import StoreProductsGrid from "@/components/store/StoreProductsGrid";

export const metadata = {
    title: "المتجر الرقمي | أكاديمية قلم",
    description: "تسوق أفضل الكتب والملفات الرقمية التعليمية من أكاديمية قلم",
};

export default function Store() {
    return (
        <>
            <Hero />
            <StoreProductsGrid />
        </>
    );
}