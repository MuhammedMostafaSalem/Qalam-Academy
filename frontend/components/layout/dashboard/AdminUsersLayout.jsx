"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import UsersTable from "@/components/dashboard/users/UsersTable";
import UsersToolbar from "@/components/dashboard/users/UsersToolbar";
import FullPageLoader from "@/components/ui/FullPageLoader";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import useAdminUsers from "@/hooks/users/useAdminUsers";
import { useLanguage } from "@/providers/LanguageProvider";

const AdminUsersLayout = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        users,
        loading,
        loadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        fetchUsers,
        loadMore,
        handleClearFilters,
    } = useAdminUsers();

    return (
        <ProtectedRoute allowedRoles={["admin"]}>
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
                    title={isEn ? "Users" : "المستخدمين"}
                    description={isEn ? "Manage all users with dashboard access and roles" : "ادارة جميع المستخدمين الذين لديهم صلاحية الوصول الى لوحة التحكم"}
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
                            hasMore={hasMore}
                            onLoadMore={loadMore}
                            loadingMore={loadingMore}
                        />
                    )
                }
            </div>
        </ProtectedRoute>
    );
};

export default AdminUsersLayout;
