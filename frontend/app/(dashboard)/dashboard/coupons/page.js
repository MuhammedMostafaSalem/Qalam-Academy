import CouponsTable from "@/components/dashboard/coupons/CouponsTable";
import CouponsToolbar from "@/components/dashboard/coupons/CouponsToolbar";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminCoupons () {
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
                title="كوبونات الخصم"
                description="ادارة جميع كوبونات الخصم"
                button="اضافة كوبون جديدة"
            />
            <CouponsToolbar />
            <CouponsTable />
        </div>
    )
}