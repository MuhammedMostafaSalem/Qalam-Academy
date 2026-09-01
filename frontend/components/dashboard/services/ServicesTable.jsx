"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useServices from "@/hooks/services/useServices";
import { deleteServiceAction, updateServiceFieldAction } from "@/actions/serviceActions";
import useToast from "@/hooks/useToast";
import UpdateServiceModal from "@/components/ui/modal/service/UpdateServiceModal";

import { useLanguage } from "@/providers/LanguageProvider";
import { useEffect } from "react";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import StatusDropdown from "@/components/shared/StatusDropdown";

const ServicesTable = () => {
    const { language, localize } = useLanguage();
    const isEn = language === "en";
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const { services, loading, error, meta, refetch } = useServices(queryString);
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const { requestDelete } = useDeleteModal();

    useEffect(() => {
        const handleServiceUpdated = () => {
            refetch();
        };
        window.addEventListener("service-updated", handleServiceUpdated);
        return () => {
            window.removeEventListener("service-updated", handleServiceUpdated);
        };
    }, [refetch]);

    const titleHead = isEn ? [
        "Service",
        "Description",
        "Status",
        "Creation Date",
        "Actions",
    ] : [
        "الخدمة",
        "الوصف",
        "الحالة",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    const handleDelete = async (serviceId) => {
        setDeletingId(serviceId);
        const result = await deleteServiceAction(serviceId);

        if (result.success) {
            successMessage(result.message || (language === "en" ? "Service deleted successfully" : "تم حذف الخدمة بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (language === "en" ? "Failed to delete service" : "فشل حذف الخدمة"));
        }

        setDeletingId(null);
    };

    const handleDeleteRequest = (serviceId) => {
        requestDelete({
            itemId: serviceId,
            title: isEn ? "Delete Service" : "حذف الخدمة",
            message: isEn ? "Are you sure you want to delete this service? This action cannot be undone." : "هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.",
        });
    };

    const handleUpdateStatus = async (serviceId, isActive) => {
        const result = await updateServiceFieldAction(serviceId, { isActive });

        if (result.success) {
            successMessage(result.message || (isEn ? "Service status updated successfully" : "تم تحديث حالة الخدمة بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to update service status" : "فشل تحديث حالة الخدمة"));
        }
    };

    const handleEditClick = (service) => {
        setEditingService(service);
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

    if (!services || services.length === 0) {
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
                        {services.map((service) => {
                            const desc = localize(service.description);
                            return (
                                <Table.Row key={service._id}>
                                    <Table.Td>
                                        <CardTable
                                            data={{
                                                id: service._id,
                                                image: service.image,
                                                name: localize(service.title),
                                            }}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        <p className="max-w-xs truncate">
                                            {desc
                                                ? desc.slice(0, 60) + (desc.length > 60 ? "..." : "")
                                                : "—"}
                                        </p>
                                    </Table.Td>

                                    <Table.Td>
                                        <StatusDropdown
                                            isActive={service.isActive}
                                            onSelect={(newStatus) => handleUpdateStatus(service._id, newStatus)}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        {service.createdAt
                                            ? new Date(service.createdAt).toLocaleDateString(language === "en" ? "en-US" : "ar-EG")
                                            : "—"}
                                    </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <MdOutlineEdit 
                                                    className="text-primary cursor-pointer"
                                                    onClick={() => handleEditClick(service)}
                                                />
                                                <button
                                                    onClick={() => handleDeleteRequest(service._id)}
                                                    disabled={deletingId === service._id}
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
                        );
                    })}
                    </Table.Body>
                </Table>
            </div>

            {meta && meta.hasMore && <LoadMore />}

            <UpdateServiceModal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                    setIsUpdateModalOpen(false);
                    setEditingService(null);
                }}
                service={editingService}
                onSuccess={() => {
                    setIsUpdateModalOpen(false);
                    setEditingService(null);
                    refetch();
                }}
            />
            <DeleteModal onConfirmAction={handleDelete} />
        </div>
    );
};

export default ServicesTable;
