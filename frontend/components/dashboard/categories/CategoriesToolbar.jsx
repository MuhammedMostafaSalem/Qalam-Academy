import ExportButton from "@/components/shared/ExportButton"
import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const CategoriesToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن تصنيف..."
                filters={
                    <>
                        <Select />
                    </>
                }
                actions={
                    <>
                        <ExportButton />
                    </>
                }
            />
        </div>
    )
}

export default CategoriesToolbar