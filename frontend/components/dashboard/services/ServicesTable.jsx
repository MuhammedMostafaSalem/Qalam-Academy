"use client";

import Table from "@/components/ui/Table";
import CardTable from "@/components/shared/CardTable";
import ActionsTable from "@/components/shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useServices from "@/hooks/services/useServices";
import { deleteServiceAction } from "@/actions/serviceActions";
import useToast from "@/hooks/useToast";
import UpdateServiceModal from "@/components/ui/modal/service/UpdateServiceModal";

const ServicesTable = () => {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const { services, loading, error, meta, refetch } = useServices(queryString);
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const titleHead = [
        "الخدمة",
        "الوصف",
        "الحالة",
        "تاريخ الإنشاء",
        "الإجراءات",
    ];

    const handleDelete = async (serviceId) => {
        if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;

        setDeletingId(serviceId);
        const result = await deleteServiceAction(serviceId);

        if (result.success) {
            successMessage(result.message || "تم حذف الخدمة بنجاح");
            refetch();
        } else {
            errorMessage(result.message || "فشل حذف الخدمة");
        }

        setDeletingId(null);
    };

    const handleEditClick = (service) => {
        setEditingService(service);
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

    if (!services || services.length === 0) {
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
                        {services.map((service) => (
                            <Table.Row key={service._id}>
                                <Table.Td>
                                    <CardTable
                                        data={{
                                            id: service._id,
                                            image: service.image,
                                            name: service.title?.ar || service.title,
                                        }}
                                    />
                                </Table.Td>

                                <Table.Td>
                                    <p className="max-w-xs truncate">
                                        {service.description?.ar || service.description
                                            ? (service.description?.ar || service.description).slice(0, 60) +
                                              ((service.description?.ar || service.description).length > 60 ? "..." : "")
                                            : "—"}
                                    </p>
                                </Table.Td>

                                <Table.Td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            service.isActive
                                                ? "bg-success/20 text-success"
                                                : "bg-error/20 text-error"
                                        }`}
                                    >
                                        {service.isActive ? "نشط" : "غير نشط"}
                                    </span>
                                </Table.Td>

                                <Table.Td>
                                    {service.createdAt
                                        ? new Date(service.createdAt).toLocaleDateString("ar-EG")
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
                                                    onClick={() => handleDelete(service._id)}
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
                        ))}
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
        </div>
    );
};

export default ServicesTable;