import ExportButton from "@/components/shared/ExportButton"
import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const StudentsToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن طالب..."
                filters={
                    <>
                        <Select />
                        <Select />
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

export default StudentsToolbar