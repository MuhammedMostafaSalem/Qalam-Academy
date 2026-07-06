import PageHeader from "@/components/dashboard/PageHeader";
import UsersTable from "@/components/dashboard/users/UsersTable";
import UsersToolbar from "@/components/dashboard/users/UsersToolbar";

export default function AdminUsers () {
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
                title="المستخدمين"
                description="ادارة جميع المستخدمين الذين لديهم صلاحية الوصول الى لوحة التحكم"
                button="اضافة مستخدم جديدة"
            />
            <UsersToolbar />
            <UsersTable />
        </div>
    )
}