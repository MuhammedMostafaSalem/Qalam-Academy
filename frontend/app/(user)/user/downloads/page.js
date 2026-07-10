import PageHeader from "@/components/dashboard/PageHeader";
import DownloadsTable from "@/components/user/dashboard/downloads/DownloadsTable";
import DownloadsToolbar from "@/components/user/dashboard/downloads/DownloadsToolbar";

export default function DownloadsPage() {
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
                title="التنزيلات"
                description="جميع الملفات التي يمكنك تنزيلها من الكورسات الخاصة بك"
            />

            <DownloadsToolbar />

            <DownloadsTable />
        </div>
    );
}