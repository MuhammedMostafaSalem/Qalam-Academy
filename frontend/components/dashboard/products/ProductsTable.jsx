"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import useProducts from "@/hooks/products/useProducts";
import useToast from "@/hooks/useToast";
import { deleteProductAction } from "@/actions/productActions";
import { useState } from "react";

const ProductsTable = () => {
    const { products, loading, error, refetch } = useProducts();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);

    const titleHead = [
        "المنتج",
        "السعر",
        "التصنيف",
        "المبيعات",
        "المخزون",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    const handleDelete = async (productId) => {
        if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

        setDeletingId(productId);
        const result = await deleteProductAction(productId);

        if (result.success) {
            successMessage(result.message || "تم حذف المنتج بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف المنتج");
        }

        setDeletingId(null);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">جاري تحميل المنتجات...</p>
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
                    لا يوجد منتجات متاحة
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
                            {products.map(product => (
                                <Table.Row key={product._id}>
                                    <Table.Td>
                                        <CardTable
                                            data={{
                                                image: product.image,
                                                name: product.title,
                                                description: product.description,
                                            }}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        {product.discountPrice > 0 ? (
                                            <span>{product.discountPrice} ج.م</span>
                                        ) : (
                                            <span>{product.price} ج.م</span>
                                        )}
                                    </Table.Td>

                                    <Table.Td>{product.category?.title || "-"}</Table.Td>

                                    <Table.Td>{product.totalSales || 0}</Table.Td>

                                    <Table.Td>{product.stock}</Table.Td>

                                    <Table.Td>
                                        {new Date(product.createdAt).toLocaleDateString("ar-EG")}
                                    </Table.Td>

                                    <Table.Td>
                                        <ActionsTable
                                            actions={
                                                <div className="flex gap-3 justify-center items-center text-[20px]">
                                                    <MdOutlineEdit className="text-primary cursor-pointer" />
                                                    <div
                                                        className="text-error cursor-pointer"
                                                        onClick={() => handleDelete(product._id)}
                                                    >
                                                        {deletingId === product._id ? (
                                                            <span className="text-sm">...</span>
                                                        ) : (
                                                            <MdOutlineDelete />
                                                        )}
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Table.Td>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    <LoadMore />
                </div>
            )}
        </div>
    );
};

export default ProductsTable;