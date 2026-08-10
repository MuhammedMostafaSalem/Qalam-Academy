import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"
import { MdClose } from "react-icons/md"

const CategoriesToolbar = ({
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    onClear
}) => {
    const hasFilters = searchQuery || typeFilter || statusFilter;

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder="ابحث عن تصنيف..."
                filters={
                    <>
                        <Select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            values={
                                [
                                    { value: "", name: "كل الانواع" },
                                    { value: "course", name: "Course" },
                                    { value: "portfolio", name: "Portfolio" },
                                ]
                            }
                        />

                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            values={
                                [
                                    { value: "", name: "كل الحالات" },
                                    { value: "true", name: "نشط" },
                                    { value: "false", name: "معطل" }
                                ]
                            }
                        />
                    </>
                }
                actions={
                    hasFilters && (
                        <button
                            onClick={onClear}
                            className="
                                flex
                                items-center
                                gap-2
                                px-4 py-2
                                text-sm text-text-secondary
                                hover:text-error
                                transition
                            "
                        >
                            <MdClose size={16} />
                            <span>مسح الفلاتر</span>
                        </button>
                    )
                }
            />
        </div>
    )
}

export default CategoriesToolbar