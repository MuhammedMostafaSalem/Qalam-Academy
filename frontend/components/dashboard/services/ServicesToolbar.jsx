import Toolbar from '@/components/ui/Toolbar'
import Select from '@/components/ui/Select'
import ExportButton from '@/components/shared/ExportButton'

const ServicesToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن خدمة..."
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

export default ServicesToolbar