import ExportButton from "@/components/shared/ExportButton"
import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const TeamToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن عضو..."
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

export default TeamToolbar