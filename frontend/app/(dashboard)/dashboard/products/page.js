import PageHeader from "@/components/dashboard/PageHeader";
import ProductsTable from "@/components/dashboard/products/ProductsTable";
import ProductsToolbar from "@/components/dashboard/products/ProductsToolbar";

export default function AdminProducts () {
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
                title="المنتجات"
                description="ادارة جميع منتجات المتجر"
                button="اضافة منتج جديدة"
            />
            <ProductsToolbar />
            <ProductsTable />
        </div>
    )
}