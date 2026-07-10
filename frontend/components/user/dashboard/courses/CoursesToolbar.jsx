import ExportButton from "@/components/shared/ExportButton"
import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const CoursesToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن كورس..."
                filters={
                    <>
                        {/* Status */}
                        <Select />
                    </>
                }
            />
        </div>
    )
}

export default CoursesToolbar