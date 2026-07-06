import Toolbar from '../../ui/Toolbar'
import Select from '../../ui/Select'
import ExportButton from '../../shared/ExportButton'

const PortfolioToolbar = () => {
    return (
        <div className="mt-[20px]">
            <Toolbar
                inputPlaceholder="ابحث عن مشروع..."
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

export default PortfolioToolbar