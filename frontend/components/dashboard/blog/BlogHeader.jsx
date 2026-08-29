"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import AddBlogModal from "@/components/ui/modal/blog/AddBlogModal";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const BlogHeader = () => {
    const { language } = useLanguage();
    const isEn = language === "en";
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <PageHeader
                title={isEn ? "Articles & Blog" : "المقالات"}
                description={isEn ? "Manage all blog posts" : "ادارة جميع مقالات المدونة"}
                button={isEn ? "Add New Article" : "اضافة مقال جديد"}
                onButtonClick={() => setIsAddModalOpen(true)}
            />
            <AddBlogModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("blog-updated"));
                    }
                    router.refresh();
                }}
            />
        </>
    );
};

export default BlogHeader;
