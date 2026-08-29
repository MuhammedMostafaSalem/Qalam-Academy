"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import { useState } from "react";
import useBlogs from "@/hooks/blog/useBlogs";
import { deleteBlogAction } from "@/actions/blogActions";
import useToast from "@/hooks/useToast";
import UpdateBlogModal from "@/components/ui/modal/blog/UpdateBlogModal";
import { useSearchParams } from "next/navigation";

import { useLanguage } from "@/providers/LanguageProvider";
import { useEffect } from "react";

const BlogTable = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const { blogs, loading, error, meta, refetch } = useBlogs(queryString);
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        const handleBlogUpdated = () => {
            refetch();
        };
        window.addEventListener("blog-updated", handleBlogUpdated);
        return () => {
            window.removeEventListener("blog-updated", handleBlogUpdated);
        };
    }, [refetch]);

    const titleHead = isEn ? [
        "Article",
        "Category",
        "Status",
        "Publish Date",
        "Actions",
    ] : [
        "المقالة",
        "التصنيف",
        "الحالة",
        "تاريخ النشر",
        "الإجراءات",
    ];

    const handleDelete = async (blogId) => {
        if (!confirm(language === "en" ? "Are you sure you want to delete this article?" : "هل أنت متأكد من حذف هذا المقال؟")) return;

        setDeletingId(blogId);
        const result = await deleteBlogAction(blogId);

        if (result.success) {
            successMessage(result.message || (language === "en" ? "Article deleted successfully" : "تم حذف المقال بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (language === "en" ? "Failed to delete article" : "فشل حذف المقال"));
        }

        setDeletingId(null);
    };

    const handleEditClick = (blog) => {
        setEditingBlog(blog);
        setIsUpdateModalOpen(true);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">
                    {language === "en" ? "Loading..." : "جاري التحميل..."}
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-error">{error}</p>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="mt-[20px] text-center py-10">
                <div className="text-center py-6 text-text-muted">
                    {language === "en" ? "No data available" : "لا يوجد بيانات متاحة"}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-[20px]">
            <div className="overflow-x-auto overflow-y-hidden">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            {titleHead.map((title, index) => (
                                <Table.Th key={index}>{title}</Table.Th>
                            ))}
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {blogs.map((blog) => (
                            <Table.Row key={blog._id}>
                                <Table.Td>
                                    <CardTable
                                        data={{
                                            id: blog._id,
                                            image: blog.featuredImage,
                                            name: localize(blog.title),
                                            description: localize(blog.excerpt),
                                        }}
                                    />
                                </Table.Td>

                                <Table.Td>
                                    {localize(blog.category?.title || blog.category?.name || blog.category, language === "en" ? "Uncategorized" : "غير مصنف")}
                                </Table.Td>

                                <Table.Td>
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm ${
                                            blog.isPublished
                                                ? "bg-success/10 text-success"
                                                : "bg-error/10 text-error"
                                        }`}
                                    >
                                        {blog.isPublished
                                            ? (language === "en" ? "Published" : "منشور")
                                            : (language === "en" ? "Draft" : "مسودة")}
                                    </span>
                                </Table.Td>

                                <Table.Td>
                                    {blog.createdAt
                                        ? new Date(blog.createdAt).toLocaleDateString(language === "en" ? "en-US" : "ar-EG")
                                        : "—"}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <MdOutlineEdit 
                                                    className="text-primary cursor-pointer"
                                                    onClick={() => handleEditClick(blog)}
                                                />
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    disabled={deletingId === blog._id}
                                                    className="text-error cursor-pointer disabled:opacity-50"
                                                    type="button"
                                                >
                                                    <MdOutlineDelete />
                                                </button>
                                            </div>
                                        }
                                    />
                                </Table.Td>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {meta && meta.hasMore && <LoadMore />}

            <UpdateBlogModal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                    setIsUpdateModalOpen(false);
                    setEditingBlog(null);
                }}
                blog={editingBlog}
                onSuccess={() => {
                    setIsUpdateModalOpen(false);
                    setEditingBlog(null);
                    refetch();
                }}
            />
        </div>
    );
};

export default BlogTable;
