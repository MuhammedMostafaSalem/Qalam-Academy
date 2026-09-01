import Hero from "@/components/store/hero/Hero";
import StoreProductsGrid from "@/components/store/StoreProductsGrid";

import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/store",
        title: {
            ar: "المتجر الرقمي والمنتجات التعليمية",
            en: "Digital Store & Educational Products",
        },
        description: {
            ar: "تسوق أفضل الكتب والملفات الرقمية والمصادر التعليمية الحصرية من أكاديمية قلم.",
            en: "Shop books, digital assets, templates, and exclusive learning resources from Qalam Academy.",
        },
    });
}

export default function Store() {
    return (
        <>
            <Hero />
            <StoreProductsGrid />
        </>
    );
}