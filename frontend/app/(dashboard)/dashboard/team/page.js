import TeamHeader from "@/components/dashboard/team/TeamHeader";
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
            <TeamHeader />
            <TeamToolbar />
            <TeamTable />
        </div>
    )
}