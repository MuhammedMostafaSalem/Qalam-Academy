"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import StatusDropdown from "@/components/shared/StatusDropdown";
import TypeDropdown from "@/components/shared/TypeDropdown";
import useCategoryActions from "@/hooks/category/useCategoryActions";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import { useState } from "react";
import UpdateCategoryModal from "@/components/ui/modal/category/UpdateCategoryModal";
import { useLanguage } from "@/providers/LanguageProvider";

const CategoriesTable = ({ categories = [], refetch, hasMore = false, onLoadMore, loadingMore = false }) => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";

    const {
        handleUpdateField,
        handleDelete,
        handleDeleteRequest
    } = useCategoryActions(refetch);

    // States for controlling update modal
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleOpenUpdateModal = (category) => {
        setSelectedCategory(category);
        setIsUpdateModalOpen(true);
    };

    const titleHead = isEn ? [
        "Category",
        "Type",
        "Status",
        "Creation Date",
        "Actions",
    ] : [
        "التصنيف",
        "النوع",
        "الحالة",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    return (
        <div className="mt-[20px]">
            <div className="overflow-x-auto min-h-[250px] pb-10">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            {titleHead.map((title, index) => (
                                <Table.Th key={index}>{title}</Table.Th>
                            ))}
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {categories.length === 0 ? (
                            <Table.Row>
                                <Table.Td colSpan={5}>
                                    <div className="text-center py-6 text-text-muted">
                                        {isEn ? "No categories available" : "لا يوجد تصنيفات متاحه"}
                                    </div>
                                </Table.Td>
                            </Table.Row>
                        ) : (
                            categories.map(category => (
                                <Table.Row key={category._id}>
                                    <Table.Td>
                                        <CardTable data={{
                                            image: category.image,
                                            name: localize(category.title, isEn ? "Untitled Category" : "تصنيف بدون عنوان"),
                                            description: localize(category.description),
                                        }} />
                                    </Table.Td>
                                    <Table.Td>
                                        <TypeDropdown
                                            currentType={category.type}
                                            onSelect={(newType) => handleUpdateField(category._id, "type", newType)}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        <StatusDropdown
                                            isActive={category.isActive}
                                            onSelect={(newStatus) => handleUpdateField(category._id, "isActive", newStatus)}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        {category.createdAt
                                            ? new Date(category.createdAt).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                            : "—"}
                                    </Table.Td>

                                    <Table.Td>
                                        <ActionsTable
                                            actions={
                                                <div
                                                    className="flex gap-3 justify-center items-center text-[20px]">
                                                    <MdOutlineEdit
                                                        onClick={() => handleOpenUpdateModal(category)}
                                                        className="text-primary cursor-pointer"
                                                    />
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteRequest(category);
                                                        }}
                                                        className="text-error cursor-pointer"
                                                    >
                                                        <MdOutlineDelete />
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Table.Td>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>

                <UpdateCategoryModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => {
                        setIsUpdateModalOpen(false);
                        setSelectedCategory(null);
                    }}
                    category={selectedCategory}
                    onSuccess={() => {
                        if (refetch) refetch();
                    }}
                />
                <DeleteModal onConfirmAction={handleDelete} />
            </div>

            {hasMore ? (
                <LoadMore onClick={onLoadMore} loading={loadingMore} />
            ) : null}
        </div>
    );
};

export default CategoriesTable;