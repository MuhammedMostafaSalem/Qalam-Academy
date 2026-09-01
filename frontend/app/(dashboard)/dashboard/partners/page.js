import PartnersHeader from "@/components/dashboard/partners/PartnersHeader";
import PartnersTable from "@/components/dashboard/partners/PartnersTable";
import PartnersToolbar from "@/components/dashboard/partners/PartnersToolbar";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/partners",
        title: {
            ar: "إدارة الشركاء",
            en: "Manage Partners",
        },
        noIndex: true,
    });
}

export default function AdminPartners() {
    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <PartnersHeader />
            <PartnersToolbar />
            <PartnersTable />
        </div>
    )
}