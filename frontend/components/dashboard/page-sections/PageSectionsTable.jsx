"use client";

import { useEffect, useState } from "react";

import Table from "@/components/ui/Table";

import {
    MdOutlineDelete,
    MdOutlineEdit,
} from "react-icons/md";

import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import StatusDropdown from "@/components/shared/StatusDropdown";

import usePageSections from "@/hooks/pageSections/usePageSections";
import useToast from "@/hooks/useToast";

import {
    deletePageSectionAction,
    updatePageSectionAction,
} from "@/actions/pageSectionActions";

import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

import PageSectionModal from "@/components/ui/modal/pageSection/PageSectionModal";
import DeleteModal from "@/components/ui/modal/DeleteModal";

import useDeleteModal from "@/hooks/useDeleteModal";

import {
    pageSectionIconRegistry,
} from "@/lib/icons/pageSectionIcons";

const PageSectionsTable = () => {
    const { language, localize } =
        useLanguage();

    const isEn = language === "en";

    const searchParams =
        useSearchParams();

    /*
     * Create a new URLSearchParams instance
     * to manipulate the query.
     */
    const backendParams =
        new URLSearchParams(
            searchParams.toString()
        );

    /*
     * Status is handled locally
     * so it should not trigger backend refetch.
     */
    backendParams.delete("status");

    const queryString =
        backendParams.toString();

    const {
        pageSections,
        loading,
        error,
        meta,
        refetch,
    } = usePageSections(
        queryString
    );

    const {
        successMessage,
        errorMessage,
    } = useToast();

    /*
     * Delete state
     */
    const [
        deletingId,
        setDeletingId,
    ] = useState(null);

    /*
     * Edit state
     */
    const [
        editingSection,
        setEditingSection,
    ] = useState(null);

    /*
     * Modal state
     */
    const [
        isModalOpen,
        setIsModalOpen,
    ] = useState(false);

    /*
     * Status update loading
     */
    const [
        updatingStatusId,
        setUpdatingStatusId,
    ] = useState(null);

    /*
     * Delete modal
     */
    const { requestDelete } = useDeleteModal();

    /*
     * Listen for page section updates
     */
    useEffect(() => {
        const handlePageSectionUpdated =
            () => {
                refetch();
            };

        window.addEventListener(
            "page-section-updated",
            handlePageSectionUpdated
        );

        return () => {
            window.removeEventListener(
                "page-section-updated",
                handlePageSectionUpdated
            );
        };
    }, [refetch]);

    /*
     * Local status filter
     */
    const statusFilter =
        searchParams.get("status");

    const filteredPageSections =
        pageSections.filter(
            (section) => {
                if (!statusFilter) {
                    return true;
                }

                if (
                    statusFilter ===
                    "active"
                ) {
                    return section.isActive;
                }

                if (
                    statusFilter ===
                    "inactive"
                ) {
                    return !section.isActive;
                }

                return true;
            }
        );

    /*
     * Table Headers
     */
    const titleHead = isEn
        ? [
            "Page",
            "Section",
            "Content",
            "Items",
            "Status",
            "Actions",
        ]
        : [
            "الصفحة",
            "القسم",
            "المحتوى",
            "العناصر",
            "الحالة",
            "الإجراءات",
        ];

    /*
     * Delete
     */
    // const handleDeleteConfirm = async () => {
    //     if (!deleteItem?._id) {
    //         return;
    //     }

    //     setDeletingId(
    //         deleteItem._id
    //     );

    //     try {
    //         const result =
    //             await deletePageSectionAction(
    //                 deleteItem._id
    //             );

    //         if (result.success) {
    //             successMessage(
    //                 result.message ||
    //                 (
    //                     isEn
    //                         ? "Page section deleted successfully"
    //                         : "تم حذف قسم الصفحة بنجاح"
    //                 )
    //             );

    //             closeDeleteModal();

    //             await refetch();
    //         } else {
    //             errorMessage(
    //                 result.message ||
    //                 (
    //                     isEn
    //                         ? "Failed to delete page section"
    //                         : "فشل حذف قسم الصفحة"
    //                 )
    //             );
    //         }
    //     } catch (error) {
    //         errorMessage(
    //             error?.message ||
    //             (
    //                 isEn
    //                     ? "Failed to delete page section"
    //                     : "فشل حذف قسم الصفحة"
    //             )
    //         );
    //     } finally {
    //         setDeletingId(null);
    //     }
    // };

    /*
     * Delete Request
     */
    const handleDeleteRequest = (section) => {
        if (!section?._id) {
            return;
        }

        requestDelete({
            itemId: section._id,
            title: isEn
                ? "Delete Page Section"
                : "حذف قسم الصفحة",
            message: isEn
                ? "Are you sure you want to delete this page section? This action cannot be undone."
                : "هل أنت متأكد من حذف قسم الصفحة؟ لا يمكن التراجع عن هذا الإجراء.",
        });
    };

    const handleDelete = async (id) => {
        if (!id) {
            return;
        }

        setDeletingId(id);

        try {
            const result =
                await deletePageSectionAction(id);

            if (result.success) {
                successMessage(
                    result.message ||
                        (
                            isEn
                                ? "Page section deleted successfully"
                                : "تم حذف قسم الصفحة بنجاح"
                        )
                );

                await refetch();
            } else {
                errorMessage(
                    result.message ||
                        (
                            isEn
                                ? "Failed to delete page section"
                                : "فشل حذف قسم الصفحة"
                        )
                );
            }
        } catch (error) {
            errorMessage(
                error?.message ||
                    (
                        isEn
                            ? "Failed to delete page section"
                            : "فشل حذف قسم الصفحة"
                    )
            );
        } finally {
            setDeletingId(null);
        }
    };

    /*
     * Status Change
     */
    const handleStatusChange = async (
        section,
        isActive
    ) => {
        if (
            section.isActive ===
            isActive
        ) {
            return;
        }

        setUpdatingStatusId(
            section._id
        );

        try {
            const result =
                await updatePageSectionAction(
                    section._id,
                    {
                        isActive,
                    }
                );

            if (result.success) {
                successMessage(
                    result.message ||
                    (
                        isEn
                            ? "Page section status updated successfully"
                            : "تم تحديث حالة قسم الصفحة بنجاح"
                    )
                );

                await refetch();
            } else {
                errorMessage(
                    result.message ||
                    (
                        isEn
                            ? "Failed to update page section status"
                            : "فشل تحديث حالة قسم الصفحة"
                    )
                );
            }
        } catch (error) {
            errorMessage(
                error?.message ||
                (
                    isEn
                        ? "Failed to update page section status"
                        : "فشل تحديث حالة قسم الصفحة"
                )
            );
        } finally {
            setUpdatingStatusId(
                null
            );
        }
    };

    /*
     * Edit
     *
     * The table already contains
     * the complete section data,
     * including content and items.
     *
     * So there is no need to make
     * another API request.
     */
    const handleEditClick = (section) => {
        if (!section?._id) {
            return;
        }

        console.log("EDIT SECTION:", section);

        setEditingSection(section);
        setIsModalOpen(true);
    };

    /*
     * Loading
     */
    if (loading) {
        return (
            <div className="mt-[20px] py-10 text-center">
                <p className="text-text-secondary">
                    {isEn
                        ? "Loading page sections..."
                        : "جاري تحميل أقسام الصفحات..."}
                </p>
            </div>
        );
    }

    /*
     * Error
     */
    if (error) {
        return (
            <div className="mt-[20px] py-10 text-center">
                <p className="text-error">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="mt-[20px]">
            {filteredPageSections.length ===
                0 ? (
                <div className="py-6 text-center text-text-muted">
                    {isEn
                        ? "No page sections available"
                        : "لا توجد أقسام صفحات متاحة"}
                </div>
            ) : (
                <div className="overflow-x-auto overflow-y-hidden">
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                {titleHead.map(
                                    (
                                        title,
                                        index
                                    ) => (
                                        <Table.Th
                                            key={
                                                index
                                            }
                                        >
                                            {
                                                title
                                            }
                                        </Table.Th>
                                    )
                                )}
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {filteredPageSections.map(
                                (
                                    section
                                ) => {
                                    /*
                                     * Localized content
                                     */
                                    const badge =
                                        localize(
                                            section
                                                ?.content
                                                ?.badge
                                        );

                                    const title =
                                        localize(
                                            section
                                                ?.content
                                                ?.title
                                        );

                                    const description =
                                        localize(
                                            section
                                                ?.content
                                                ?.description
                                        );

                                    /*
                                     * Items
                                     */
                                    const items =
                                        Array.isArray(
                                            section?.items
                                        )
                                            ? section.items
                                            : [];

                                    return (
                                        <Table.Row
                                            key={
                                                section._id
                                            }
                                        >
                                            {/* Page */}
                                            <Table.Td>
                                                <span className="font-medium">
                                                    {
                                                        section.page
                                                    }
                                                </span>
                                            </Table.Td>

                                            {/* Section */}
                                            <Table.Td>
                                                <span className="font-mono font-bold text-primary">
                                                    {
                                                        section.section
                                                    }
                                                </span>
                                            </Table.Td>

                                            {/* Content */}
                                            <Table.Td>
                                                <div className="max-w-[350px]">
                                                    {badge && (
                                                        <div className="mb-1 text-xs text-primary">
                                                            {
                                                                badge
                                                            }
                                                        </div>
                                                    )}

                                                    {title && (
                                                        <div className="font-semibold">
                                                            {
                                                                title
                                                            }
                                                        </div>
                                                    )}

                                                    {description && (
                                                        <div className="mt-1 line-clamp-2 text-xs text-text-secondary">
                                                            {
                                                                description
                                                            }
                                                        </div>
                                                    )}

                                                    {!badge &&
                                                        !title &&
                                                        !description && (
                                                            <span className="text-text-muted">
                                                                —
                                                            </span>
                                                        )}
                                                </div>
                                            </Table.Td>

                                            {/* Items */}
                                            <Table.Td>
                                                {items.length >
                                                    0 ? (
                                                    <div className="flex items-center gap-3">
                                                        {/* Count */}
                                                        <span className="font-medium">
                                                            {
                                                                items.length
                                                            }
                                                        </span>

                                                        {/* Icons */}
                                                        <div className="flex items-center gap-1.5">
                                                            {items
                                                                .slice(
                                                                    0,
                                                                    4
                                                                )
                                                                .map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        const Icon =
                                                                            pageSectionIconRegistry[
                                                                            item?.icon
                                                                            ];

                                                                        if (
                                                                            !Icon
                                                                        ) {
                                                                            return null;
                                                                        }

                                                                        return (
                                                                            <span
                                                                                key={`${section._id}-${index}`}
                                                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"
                                                                                title={
                                                                                    item?.icon
                                                                                }
                                                                            >
                                                                                <Icon className="h-4 w-4" />
                                                                            </span>
                                                                        );
                                                                    }
                                                                )}

                                                            {items.length >
                                                                4 && (
                                                                    <span className="text-xs text-text-secondary">
                                                                        +
                                                                        {items.length -
                                                                            4}
                                                                    </span>
                                                                )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-text-muted">
                                                        —
                                                    </span>
                                                )}
                                            </Table.Td>

                                            {/* Status */}
                                            <Table.Td>
                                                <StatusDropdown
                                                    isActive={
                                                        section.isActive
                                                    }
                                                    activeLabel={
                                                        isEn
                                                            ? "Active"
                                                            : "نشط"
                                                    }
                                                    inactiveLabel={
                                                        isEn
                                                            ? "Inactive"
                                                            : "غير نشط"
                                                    }
                                                    disabled={
                                                        updatingStatusId ===
                                                        section._id
                                                    }
                                                    onSelect={(
                                                        newStatus
                                                    ) =>
                                                        handleStatusChange(
                                                            section,
                                                            newStatus
                                                        )
                                                    }
                                                />
                                            </Table.Td>

                                            {/* Actions */}
                                            <Table.Td>
                                                <ActionsTable
                                                    actions={
                                                        <div className="flex items-center justify-center gap-3 text-[20px]">
                                                            {/* Edit */}
                                                            <MdOutlineEdit
                                                                className="cursor-pointer text-primary"
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        section
                                                                    )
                                                                }
                                                            />

                                                            {/* Delete */}
                                                            <button
                                                                type="button"
                                                                className="cursor-pointer text-error disabled:cursor-not-allowed disabled:opacity-50"
                                                                onClick={() =>
                                                                    handleDeleteRequest(
                                                                        section
                                                                    )
                                                                }
                                                                disabled={
                                                                    deletingId ===
                                                                    section._id
                                                                }
                                                            >
                                                                {deletingId ===
                                                                    section._id ? (
                                                                    <span className="text-sm">
                                                                        ...
                                                                    </span>
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
                                }
                            )}
                        </Table.Body>
                    </Table>

                    {meta?.hasMore && (
                        <LoadMore />
                    )}
                </div>
            )}

            {/* Create / Update Modal */}
            <PageSectionModal
                isOpen={
                    isModalOpen
                }
                onClose={() => {
                    setIsModalOpen(
                        false
                    );

                    setEditingSection(
                        null
                    );
                }}
                mode={
                    editingSection
                        ? "update"
                        : "create"
                }
                section={
                    editingSection
                }
                onSuccess={() => {
                    setIsModalOpen(
                        false
                    );

                    setEditingSection(
                        null
                    );

                    if (
                        typeof window !==
                        "undefined"
                    ) {
                        window.dispatchEvent(
                            new Event(
                                "page-section-updated"
                            )
                        );
                    }

                    refetch();
                }}
            />

            {/* Delete Modal */}
            {/* <DeleteModal
                isOpen={
                    isDeleteModalOpen
                }
                onClose={
                    closeDeleteModal
                }
                onConfirm={
                    handleDeleteConfirm
                }
                loading={
                    !!deletingId
                }
                title={
                    isEn
                        ? "Delete Page Section"
                        : "حذف قسم الصفحة"
                }
                message={
                    isEn
                        ? "Are you sure you want to delete this page section? This action cannot be undone."
                        : "هل أنت متأكد من حذف قسم الصفحة؟ لا يمكن التراجع عن هذا الإجراء."
                }
            /> */}
            <DeleteModal
                onConfirmAction={handleDelete}
            />
        </div>
    );
};

export default PageSectionsTable;