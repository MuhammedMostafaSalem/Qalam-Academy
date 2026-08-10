import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"
import { MdClose } from "react-icons/md";

const UsersToolbar = ({
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    onClear
}) => {
    // التحقق هل فيه أي فلتر شغال؟
    const hasFilters = searchQuery || roleFilter || statusFilter;

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder="ابحث بالاسم أو البريد الإلكتروني..."
                filters={
                    <>
                        {/* فلتر الـ Role */}
                        <Select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            values={
                                [
                                    { value: "", name: "كل الأدوار" },
                                    { value: "admin", name: "Admin" },
                                    { value: "instructor", name: "Instructor" },
                                    { value: "student", name: "Student" }
                                ]
                            }
                        />

                        {/* فلتر الحالة (نشط / غير نشط) */}
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

export default UsersToolbar