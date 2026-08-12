import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"
import { MdClose } from "react-icons/md"
import { useState, useEffect } from "react"
import { getCategoriesAction } from "@/actions/categoryActions"

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
    const [dynamicTypes, setDynamicTypes] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await getCategoriesAction("limit=100");
            if (res.success) {
                const list = res.data?.categories || res.data?.documents || res.data || [];
                const uniqueTypes = Array.from(new Set(list.map((c) => c.type))).filter(Boolean);
                setDynamicTypes(uniqueTypes);
            }
        };
        fetchAllCategories();
    }, []);

    const typeOptions = [
        { value: "", name: "كل الانواع" },
        ...dynamicTypes.map((type) => ({
            value: type,
            // capitalize first letter for display
            name: type.charAt(0).toUpperCase() + type.slice(1)
        }))
    ];

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
                            values={typeOptions}
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