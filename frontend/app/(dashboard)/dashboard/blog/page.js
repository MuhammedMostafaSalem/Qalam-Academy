import BlogTable from "@/components/dashboard/blog/BlogTable";
import BlogToolbar from "@/components/dashboard/blog/BlogToolbar";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminBlog () {
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
                title="المقالات"
                description="ادارة جميع مقالات المدونة"
            />
            <BlogToolbar />
            <BlogTable />
        </div>
    )
}