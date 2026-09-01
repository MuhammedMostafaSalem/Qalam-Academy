import TeamHeader from "@/components/dashboard/team/TeamHeader";
import TeamTable from "@/components/dashboard/team/TeamTable";
import TeamToolbar from "@/components/dashboard/team/TeamToolbar";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/team",
        title: {
            ar: "إدارة فريق العمل",
            en: "Manage Team",
        },
        noIndex: true,
    });
}

export default function AdminTeam() {
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
            <TeamHeader />
            <TeamToolbar />
            <TeamTable />
        </div>
    )
}