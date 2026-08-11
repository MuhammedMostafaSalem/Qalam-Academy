import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"
import { MdClose } from "react-icons/md";

const StudentsToolbar = ({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    onClear
}) => {
    const hasFilters = searchQuery || statusFilter;

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder="ابحث عن طالب..."
                filters={
                    <>
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

export default StudentsToolbar