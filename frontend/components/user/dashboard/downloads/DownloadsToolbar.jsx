import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const DownloadsToolbar = () => {
    return (
        <Toolbar
            inputPlaceholder="ابحث عن ملف..."
            filters={
                <>
                    {/* Type => كل الملفات, PDF, ZIP, Source Code, Video */}
                    <Select />
                </>
            }
        />
    )
}

export default DownloadsToolbar