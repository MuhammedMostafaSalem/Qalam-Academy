"use client";

import CategoriesTable from '@/components/dashboard/categories/CategoriesTable';
import CategoriesToolbar from '@/components/dashboard/categories/CategoriesToolbar';
import PageHeader from '@/components/dashboard/PageHeader';
import FullPageLoader from "@/components/ui/FullPageLoader";
import CategoryModal from "@/components/ui/modal/CategoryModal";
import { useCategoryManager } from "@/hooks/useCategoryManager";
import { openCategoryModal } from '@/store/slices/categorySlice';
import { useDispatch } from 'react-redux';

const CategoryLayout = () => {
    const dispatch = useDispatch();

    const {
        categories,
        meta,
        loading,
        searchTerm,
        setSearchTerm,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        handleLoadMore,
        handleResetFilters,
    } = useCategoryManager();

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
            {loading && <FullPageLoader />}

            <PageHeader
                title="تصنيفات الكورسات"
                description="ادارة جميع تصنيفات كورسات المنصة"
                button="اضافة تصنيف جديدة"
                onButtonClick={() => dispatch(openCategoryModal({ mode: "create", category: null }))}
            />

            <CategoriesToolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategoryFilter}
                setSelectedCategory={setSelectedCategoryFilter}
                options={categories}
            />

            <CategoriesTable
                categories={categories}
                loading={loading}
                onEdit={(category) => dispatch(openCategoryModal({ mode: "edit", category }))}
                onDelete={(category) => dispatch(openCategoryModal({ mode: "delete", category }))}
                onLoadMore={handleLoadMore}
                hasMore={meta?.hasMore}
                searchTerm={searchTerm}
                selectedCategory={selectedCategoryFilter}
                onResetFilters={handleResetFilters}
            />
        </div>
    );
};

export default CategoryLayout;