import PageHeader from "@/components/dashboard/PageHeader";
import TeamTable from "@/components/dashboard/team/TeamTable";
import TeamToolbar from "@/components/dashboard/team/TeamToolbar";

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
            <PageHeader
                title="أعضاء الفريق"
                description="ادارة جميع أعضاء الفريق"
                button="اضافة عضو جديدة"
            />
            <TeamToolbar />
            <TeamTable />
        </div>
    )
}