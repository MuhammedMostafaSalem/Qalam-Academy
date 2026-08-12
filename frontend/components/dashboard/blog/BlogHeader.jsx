"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddBlogModal from "@/components/ui/modal/blog/AddBlogModal";
import { useRouter } from "next/navigation";

const BlogHeader = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title="المقالات"
                description="ادارة جميع مقالات المدونة"
                button="اضافة مقال جديد"
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddBlogModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    router.refresh(); // Refresh the page to show new blog post
                }}
            />
        </>
    );
};

export default BlogHeader;
