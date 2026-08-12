"use client"

import PageHeader from "@/components/dashboard/PageHeader"
import UsersTable from "@/components/dashboard/users/UsersTable"
import UsersToolbar from "@/components/dashboard/users/UsersToolbar"
import FullPageLoader from "@/components/ui/FullPageLoader";
import useAdminUsers from "@/hooks/users/useAdminUsers";

const AdminUsersLayout = () => {
    const {
        users,
        loading,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        fetchUsers,
        handleClearFilters,
    } = useAdminUsers();

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
                title="المستخدمين"
                description="ادارة جميع المستخدمين الذين لديهم صلاحية الوصول الى لوحة التحكم"
            />

            <UsersToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onClear={handleClearFilters}
            />

            {
                loading ? (
                    <FullPageLoader />
                ) : (
                    <UsersTable
                        users={users}
                        refetch={fetchUsers}
                    />
                )
            }
        </div>
    )
}

export default AdminUsersLayout