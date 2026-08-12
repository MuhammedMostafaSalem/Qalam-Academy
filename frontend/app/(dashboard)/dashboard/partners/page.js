import PartnersHeader from "@/components/dashboard/partners/PartnersHeader";
import PartnersTable from "@/components/dashboard/partners/PartnersTable";
import PartnersToolbar from "@/components/dashboard/partners/PartnersToolbar";

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