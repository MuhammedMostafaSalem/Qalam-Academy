import ExportButton from "@/components/shared/ExportButton"
import Toolbar from "@/components/ui/Toolbar"

const EnrollmentsToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن اشتراك..."
                actions={
                    <>
                        <ExportButton />
                    </>
                }
            />
        </div>
    )
}

export default EnrollmentsToolbar