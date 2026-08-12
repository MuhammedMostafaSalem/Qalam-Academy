import PageHeader from "@/components/dashboard/PageHeader";
import SettingsForm from "@/components/dashboard/settings/SettingsForm";

export const metadata = {
    title: "إعدادات المنصة | Qalam Academy",
    description: "إدارة إعدادات المنصة",
};

export default function AdminSettings() {
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
                title="إعدادات المنصة"
                description="إدارة جميع المعلومات الأساسية للمنصة"
            />
            
            <SettingsForm />
        </div>
    );
}
