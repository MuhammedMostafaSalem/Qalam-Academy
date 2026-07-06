import ExportButton from "@/components/shared/ExportButton"
import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const CouponsToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن كوبون..."
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

export default CouponsToolbar