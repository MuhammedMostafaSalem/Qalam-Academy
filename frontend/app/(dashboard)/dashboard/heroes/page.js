import HeroesManager from "@/components/dashboard/heroes/HeroesManager";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/heroes",
        title: {
            ar: "إدارة هيرو الصفحات",
            en: "Manage Page Heroes",
        },
        noIndex: true,
    });
}

export default function HeroesPage() {
    return <HeroesManager />;
}
