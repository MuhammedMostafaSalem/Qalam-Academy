"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StudentsTable from "@/components/dashboard/students/StudentsTable";
import StudentsToolbar from "@/components/dashboard/students/StudentsToolbar";
import FullPageLoader from "@/components/ui/FullPageLoader";
import useStudents from "@/hooks/students/useStudents";
import { useLanguage } from "@/providers/LanguageProvider";

export default function AdminStudents() {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        students,
        loading,
        loadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        fetchStudents,
        loadMore,
        handleClearFilters,
    } = useStudents();

    return (
        <div
            className="
                glass 
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <PageHeader
                title={isEn ? "Students" : "الطلاب"}
                description={isEn ? "Manage and monitor all registered students" : "ادارة جميع الطلاب المسجلين في المنصة"}
            />

            {students.length >= 1 ? (
                <StudentsToolbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    onClear={handleClearFilters}
                />
            ) : null}

            {loading ? (
                <FullPageLoader />
            ) : (
                <StudentsTable
                    students={students}
                    refetch={fetchStudents}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                    loadingMore={loadingMore}
                />
            )}
        </div>
    );
}
