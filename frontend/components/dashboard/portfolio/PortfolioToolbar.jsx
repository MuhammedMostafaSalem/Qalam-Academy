import Toolbar from '../../ui/Toolbar'
import Select from '../../ui/Select'

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
            />
        </div>
    )
}

export default PortfolioToolbar