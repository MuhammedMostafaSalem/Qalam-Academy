"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StudentsTable from "@/components/dashboard/students/StudentsTable";
import StudentsToolbar from "@/components/dashboard/students/StudentsToolbar";
import FullPageLoader from "@/components/ui/FullPageLoader";
import useStudents from "@/hooks/students/useStudents";

export default function AdminStudents() {
    const {
        students,
        loading,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        fetchStudents,
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
                title="الطلاب"
                description="ادارة جميع الطلاب المسجلين في المنصة"
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
                />
            )}
        </div>
    );
}