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

const BlogTable = () => {
    const { blogs, loading, error, meta, refetch } = useBlogs();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    const titleHead = [
        "المقالة",
        "التصنيف",
        "الحالة",
        "تاريخ النشر",
        "الإجراءات",
    ];

    const handleDelete = async (blogId) => {
        if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;

        setDeletingId(blogId);
        const result = await deleteBlogAction(blogId);

        if (result.success) {
            successMessage(result.message || "تم حذف المقال بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف المقال");
        }

        setDeletingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري التحميل...</p>
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
                <div className="text-center py-6 text-text-muted">لا يوجد بيانات متاحة</div>
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
                                            name: blog.title?.ar || blog.title,
                                            description: blog.excerpt?.ar || blog.excerpt,
                                        }}
                                    />
                                </Table.Td>

                                <Table.Td>
                                    {blog.category?.title?.ar || blog.category?.title || blog.category || "غير مصنف"}
                                </Table.Td>

                                <Table.Td>
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm ${
                                            blog.isPublished
                                                ? "bg-green-500/10 text-green-500"
                                                : "bg-red-500/10 text-red-500"
                                        }`}
                                    >
                                        {blog.isPublished ? "منشور" : "مسودة"}
                                    </span>
                                </Table.Td>

                                <Table.Td>
                                    {blog.createdAt
                                        ? new Date(blog.createdAt).toLocaleDateString("ar-EG")
                                        : "—"}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <MdOutlineEdit className="text-primary cursor-pointer" />
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
        </div>
    );
};

export default BlogTable;