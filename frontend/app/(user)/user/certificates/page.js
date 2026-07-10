import PageHeader from "@/components/dashboard/PageHeader";
import CertificatesGrid from "@/components/user/dashboard/certificates/CertificatesGrid";

export default function CertificatesPage() {
    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
                space-y-6
            "
        >
            <PageHeader
                title="الشهادات"
                description="جميع الشهادات التي حصلت عليها بعد إكمال الكورسات"
            />

            <CertificatesGrid />
        </div>
    );
}