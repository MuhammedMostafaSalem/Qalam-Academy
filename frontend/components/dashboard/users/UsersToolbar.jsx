"use client";

import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";
import { MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/LanguageProvider";

const UsersToolbar = ({
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    onClear
}) => {
    const { language } = useLanguage();
    const isEn = language === "en";

    // التحقق هل فيه أي فلتر شغال؟
    const hasFilters = searchQuery || roleFilter || statusFilter;

    return (
        <div className="mt-[20px]">
            <Toolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                inputPlaceholder={isEn ? "Search by name or email..." : "ابحث بالاسم أو البريد الإلكتروني..."}
                filters={
                    <>
                        {/* فلتر الـ Role */}
                        <Select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            values={
                                [
                                    { value: "", name: isEn ? "All Roles" : "كل الأدوار" },
                                    { value: "admin", name: isEn ? "Admin" : "مسؤول" },
                                    { value: "instructor", name: isEn ? "Instructor" : "محاضر" },
                                    { value: "student", name: isEn ? "Student" : "طالب" }
                                ]
                            }
                        />

                        {/* فلتر الحالة (نشط / غير نشط) */}
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            values={
                                [
                                    { value: "", name: isEn ? "All Statuses" : "كل الحالات" },
                                    { value: "true", name: isEn ? "Active" : "نشط" },
                                    { value: "false", name: isEn ? "Inactive" : "معطل" }
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
                            <span>{isEn ? "Clear Filters" : "مسح الفلاتر"}</span>
                        </button>
                    )
                }
            />
        </div>
    );
};

export default UsersToolbar;