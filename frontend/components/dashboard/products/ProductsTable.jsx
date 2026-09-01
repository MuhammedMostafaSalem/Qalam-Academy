"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import useProducts from "@/hooks/products/useProducts";
import useToast from "@/hooks/useToast";
import { deleteProductAction, updateProductFieldAction } from "@/actions/productActions";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import UpdateProductModal from "@/components/ui/modal/product/UpdateProductModal";
import { useLanguage } from "@/providers/LanguageProvider";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import StatusDropdown from "@/components/shared/StatusDropdown";

const ProductsTable = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const { products, loading, error, meta, refetch } = useProducts(queryString);
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);
    const { requestDelete } = useDeleteModal();

    useEffect(() => {
        const handleProductUpdated = () => {
            refetch();
        };
        window.addEventListener("product-updated", handleProductUpdated);
        return () => {
            window.removeEventListener("product-updated", handleProductUpdated);
        };
    }, [refetch]);

    const titleHead = isEn ? [
        "Product",
        "Price",
        "Category",
        "Sales",
        "Stock",
        "Status",
        "Creation Date",
        "Actions",
    ] : [
        "المنتج",
        "السعر",
        "التصنيف",
        "المبيعات",
        "المخزون",
        "الحالة",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    const handleDelete = async (productId) => {
        setDeletingId(productId);
        const result = await deleteProductAction(productId);

        if (result.success) {
            successMessage(result.message || (isEn ? "Product deleted successfully" : "تم حذف المنتج بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to delete product" : "فشل حذف المنتج"));
        }

        setDeletingId(null);
    };

    const handleDeleteRequest = (productId) => {
        requestDelete({
            itemId: productId,
            title: isEn ? "Delete Product" : "حذف المنتج",
            message: isEn ? "Are you sure you want to delete this product? This action cannot be undone." : "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
        });
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateStatus = async (productId, isPublished) => {
        setUpdatingStatusId(productId);
        const result = await updateProductFieldAction(productId, { isPublished });

        if (result.success) {
            successMessage(result.message || (isEn ? "Product status updated successfully" : "تم تحديث حالة المنتج بنجاح"));
            await refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to update product status" : "فشل تحديث حالة المنتج"));
        }

        setUpdatingStatusId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">{isEn ? "Loading products..." : "جاري تحميل المنتجات..."}</p>
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

    return (
        <div className="mt-[20px]">
            {products.length === 0 ? (
                <div className="text-center py-6 text-text-muted">
                    {isEn ? "No products available" : "لا يوجد منتجات متاحة"}
                </div>
            ) : (
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
                            {products.map(product => {
                                const productName = localize(product.title, isEn ? "Untitled Product" : "منتج بدون عنوان");
                                const productDesc = localize(product.description);
                                const categoryName = localize(product.category?.title, "—");

                                return (
                                    <Table.Row key={product._id}>
                                        <Table.Td>
                                            <CardTable
                                                data={{
                                                    image: product.image,
                                                    name: productName,
                                                    description: productDesc,
                                                }}
                                            />
                                        </Table.Td>

                                        <Table.Td>
                                            {product.discountPrice > 0 ? (
                                                <span>{product.discountPrice} {isEn ? "EGP" : "ج.م"}</span>
                                            ) : (
                                                <span>{product.price} {isEn ? "EGP" : "ج.م"}</span>
                                            )}
                                        </Table.Td>

                                        <Table.Td>{categoryName}</Table.Td>

                                        <Table.Td>{product.totalSales || 0}</Table.Td>

                                        <Table.Td>{product.stock}</Table.Td>

                                        <Table.Td>
                                            <StatusDropdown
                                                isActive={product.isPublished}
                                                activeLabel={isEn ? "Published" : "منشور"}
                                                inactiveLabel={isEn ? "Draft" : "مسودة"}
                                                disabled={updatingStatusId === product._id}
                                                onSelect={(newStatus) => handleUpdateStatus(product._id, newStatus)}
                                            />
                                        </Table.Td>

                                        <Table.Td>
                                            {product.createdAt
                                                ? new Date(product.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                                : "—"}
                                        </Table.Td>

                                        <Table.Td>
                                            <ActionsTable
                                                actions={
                                                    <div className="flex gap-3 justify-center items-center text-[20px]">
                                                        <MdOutlineEdit
                                                            className="text-primary cursor-pointer"
                                                            onClick={() => handleEditClick(product)}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="text-error cursor-pointer"
                                                            onClick={() => handleDeleteRequest(product._id)}
                                                            disabled={deletingId === product._id}
                                                        >
                                                            {deletingId === product._id ? (
                                                                <span className="text-sm">...</span>
                                                            ) : (
                                                                <MdOutlineDelete />
                                                            )}
                                                        </button>
                                                    </div>
                                                }
                                            />
                                        </Table.Td>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>

                    {meta?.hasMore && <LoadMore />}
                </div>
            )}

            <UpdateProductModal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                    setIsUpdateModalOpen(false);
                    setEditingProduct(null);
                }}
                product={editingProduct}
                onSuccess={() => {
                    setIsUpdateModalOpen(false);
                    setEditingProduct(null);
                    refetch();
                }}
            />
            <DeleteModal onConfirmAction={handleDelete} />
        </div>
    );
};

export default ProductsTable;
