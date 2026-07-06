import ExportButton from "../shared/ExportButton";
import SearchInput from "./SearchInput";

const Toolbar = ({
    inputPlaceholder,
    filters,
    actions,
}) => {
    
    return (
        <div
            className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >
            {/* Search & Filters */}
            <div
                className="
                        flex
                        flex-1
                        flex-col
                        gap-3
                        md:flex-row
                        md:items-center
                    "
            >
                <div className="w-full md:w-[250px]">
                    <SearchInput inputPlaceholder={inputPlaceholder} />
                </div>

                {filters}
            </div>

            {/* Actions */}
            <div
                className="
                    block
                    md:flex
                    flex-wrap justify-between
                    items-center
                    gap-3
                "
            >
                {actions}
            </div>
        </div>
    );
};

export default Toolbar;