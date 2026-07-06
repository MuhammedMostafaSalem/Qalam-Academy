import CategoriesTable from "@/components/dashboard/categories/CategoriesTable";
import CategoriesToolbar from "@/components/dashboard/categories/CategoriesToolbar";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminCategories() {
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
                title="تصنيفات الكورسات"
                description="ادارة جميع تصنيفات كورسات المنصة"
                button="اضافة تصنيف جديدة"
            />
            <CategoriesToolbar />
            <CategoriesTable />
        </div>
    )
}