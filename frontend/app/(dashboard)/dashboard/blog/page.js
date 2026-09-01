import BlogTable from "@/components/dashboard/blog/BlogTable";
import BlogToolbar from "@/components/dashboard/blog/BlogToolbar";
import BlogHeader from "@/components/dashboard/blog/BlogHeader";
import { Suspense } from "react";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/blog",
        title: {
            ar: "إدارة المدونة والمقالات",
            en: "Manage Blog",
        },
        noIndex: true,
    });
}

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
            <BlogHeader />
            <Suspense fallback={<div className="text-center py-4">جاري التحميل...</div>}>
                <BlogToolbar />
                <BlogTable />
            </Suspense>
        </div>
    )
}