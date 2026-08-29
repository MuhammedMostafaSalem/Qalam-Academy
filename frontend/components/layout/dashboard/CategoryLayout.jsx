"use client";

import CategoriesTable from '@/components/dashboard/categories/CategoriesTable';
import CategoriesToolbar from '@/components/dashboard/categories/CategoriesToolbar';
import PageHeader from '@/components/dashboard/PageHeader';
import FullPageLoader from "@/components/ui/FullPageLoader";
import AddCategoryModal from "@/components/ui/modal/category/AddCategoryModal";
import UpdateCategoryModal from '@/components/ui/modal/category/UpdateCategoryModal';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import useGetCategories from '@/hooks/category/useGetCategories';
import { closeCategoryModal, openCategoryModal } from '@/store/slices/categorySlice';
import { showToast } from '@/store/slices/toastSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '@/providers/LanguageProvider';

const CategoryLayout = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const {
        categories,
        loading,
        loadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        typeFilter,
        setTypeFilter,
        statusFilter,
        setStatusFilter,
        fetchCategories,
        loadMore,
        handleClearFilters,
    } = useGetCategories();

    const dispatch = useDispatch();

    // Category modal state
    const {
        isOpen: isCategoryModalOpen,
        mode: categoryModalMode,
        category: selectedCategory,
    } = useSelector((state) => state.category);

    const handleOpenCreateModal = () => {
        dispatch(
            openCategoryModal({
                mode: "create",
                category: null,
            })
        );
    };

    const handleCloseModal = () => {
        dispatch(closeCategoryModal());
    };

    const handleCategorySuccess = async (category) => {
        dispatch(closeCategoryModal());

        await fetchCategories();

        dispatch(
            showToast({
                message: isEn ? "Category added successfully" : "تم إضافة التصنيف بنجاح",
                type: "success",
            })
        );
    };

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
                title={isEn ? "Course & Entity Categories" : "تصنيفات المنصة"}
                description={isEn ? "Manage all platform categories" : "ادارة جميع تصنيفات المنصة"}
                button={isEn ? "Add New Category" : "اضافة تصنيف جديد"}
                onButtonClick={handleOpenCreateModal}
            />

            <CategoriesToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onClear={handleClearFilters}
            />

            <CategoriesTable
                categories={categories}
                hasMore={hasMore}
                onLoadMore={loadMore}
                loadingMore={loadingMore}
                categoryModalMode={categoryModalMode}
                isOpen={isCategoryModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleCategorySuccess}
                refetch={fetchCategories}
                onEdit={(category) =>
                    dispatch(
                        openCategoryModal({
                            mode: "edit",
                            category,
                        })
                    )
                }
                onDelete={(category) =>
                    dispatch(
                        openCategoryModal({
                            mode: "delete",
                            category,
                        })
                    )
                }
            />

            {/* Create Modal */}
            {categoryModalMode === "create" && (
                <AddCategoryModal
                    isOpen={isCategoryModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={handleCategorySuccess}
                />
            )}
            </div>
        </ProtectedRoute>
    );
};

export default CategoryLayout;