"use client";

import CardTable from "@/components/shared/CardTable";
import Table from "@/components/ui/Table";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import usePortfolios from "@/hooks/portfolio/usePortfolios";
import { deletePortfolioAction } from "@/actions/portfolioActions";
import useToast from "@/hooks/useToast";
import UpdatePortfolioModal from "@/components/ui/modal/portfolio/UpdatePortfolioModal";

const PortfolioTable = () => {
    const { portfolios, loading, error, meta, refetch } = usePortfolios();
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [editingPortfolio, setEditingPortfolio] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const titleHead = [
        "المشروع",
        "التصنيف",
        "رابط المشروع",
        "تاريخ الانشاء",
        "الاجراءات",
    ];

    const handleDelete = async (portfolioId) => {
        if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;

        setDeletingId(portfolioId);
        const result = await deletePortfolioAction(portfolioId);

        if (result.success) {
            successMessage(result.message || "تم حذف المشروع بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف المشروع");
        }

        setDeletingId(null);
    };

    const handleEditClick = (portfolio) => {
        setEditingPortfolio(portfolio);
        setIsUpdateModalOpen(true);
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

    if (!portfolios || portfolios.length === 0) {
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
                        {portfolios.map((portfolio) => (
                            <Table.Row key={portfolio._id}>
                                <Table.Td>
                                    <CardTable
                                        data={{
                                            id: portfolio._id,
                                            image: portfolio.image,
                                            name: portfolio.title?.ar || portfolio.title,
                                            description: portfolio.description?.ar || portfolio.description,
                                        }}
                                    />
                                </Table.Td>

                                <Table.Td>
                                    {portfolio.category?.title?.ar || portfolio.category?.title || portfolio.category || "غير مصنف"}
                                </Table.Td>

                                <Table.Td>
                                    {portfolio.projectUrl ? (
                                        <a
                                            href={portfolio.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            عرض المشروع
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </Table.Td>

                                <Table.Td>
                                    {portfolio.createdAt
                                        ? new Date(portfolio.createdAt).toLocaleDateString("ar-EG")
                                        : "—"}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <MdOutlineEdit 
                                                    className="text-primary cursor-pointer"
                                                    onClick={() => handleEditClick(portfolio)}
                                                />
                                                <button
                                                    onClick={() => handleDelete(portfolio._id)}
                                                    disabled={deletingId === portfolio._id}
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

            <UpdatePortfolioModal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                    setIsUpdateModalOpen(false);
                    setEditingPortfolio(null);
                }}
                portfolio={editingPortfolio}
                onSuccess={() => {
                    setIsUpdateModalOpen(false);
                    setEditingPortfolio(null);
                    refetch();
                }}
            />
        </div>
    );
};

export default PortfolioTable;