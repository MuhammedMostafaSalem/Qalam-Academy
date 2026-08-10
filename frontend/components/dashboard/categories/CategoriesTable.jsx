"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import categories from "./categories";
import StatusDropdown from "@/components/shared/StatusDropdown";
import TypeDropdown from "@/components/shared/TypeDropdown";
import useCategoryActions from "@/hooks/category/useCategoryActions";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import { useState } from "react";
import UpdateCategoryModal from "@/components/ui/modal/category/UpdateCategoryModal";

const CategoriesTable = ({ categories = [], refetch }) => {
    const {
        handleUpdateField,
        handleDelete,
        handleDeleteRequest
    } = useCategoryActions(refetch);

    // 2. States خاصة بالتحكم في مودال التعديل
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // دالة فتح المودال وتحديد التصنيف المراد تعديله
    const handleOpenUpdateModal = (category) => {
        setSelectedCategory(category);
        setIsUpdateModalOpen(true);
    }

    const titleHead = [
        "التصنيف",
        "النوع",
        "الحالة",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    return (
        <div className="mt-[20px]">
            {
                categories.length === 0 ? (
                    <div className="text-center py-6 text-text-muted">
                        لا يوجد تصنيفات متاحه
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
                                {categories.map(category => (
                                    <Table.Row key={category._id}>
                                        <Table.Td>
                                            <CardTable data={{
                                                image: category.image,
                                                name: category.title,
                                                description: category.description,
                                            }} />
                                        </Table.Td>

                                        {/* <Table.Td>{category.coursesCount}</Table.Td> */}
                                        <Table.Td>
                                            <TypeDropdown
                                                currentType={category.type}
                                                onSelect={(newType) => handleUpdateField(category._id, "type", newType)}
                                            />
                                        </Table.Td>

                                        {/* <Table.Td>{category.order}</Table.Td> */}
                                        <Table.Td>
                                            <StatusDropdown
                                                isActive={category.isActive}
                                                onSelect={(newStatus) => handleUpdateField(category._id, "isActive", newStatus)}
                                            />
                                        </Table.Td>

                                        <Table.Td>
                                            {new Date(category.createdAt).toLocaleDateString("ar-EG")}
                                        </Table.Td>

                                        <Table.Td>
                                            <ActionsTable
                                                actions={
                                                    <div
                                                        onClick={() => handleOpenUpdateModal(category)}
                                                        className="flex gap-3 justify-center items-center text-[20px]">
                                                        <MdOutlineEdit className="text-primary cursor-pointer" />
                                                        <div
                                                            onClick={() => handleDeleteRequest(category)}
                                                            className="text-error cursor-pointer"
                                                        >
                                                            <MdOutlineDelete />
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </Table.Td>
                                    </Table.Row>
                                ))}
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
                )
            }

            {
                categories.length >= 4 ?
                    <LoadMore />
                : null
            }
        </div>
    )
}

export default CategoriesTable