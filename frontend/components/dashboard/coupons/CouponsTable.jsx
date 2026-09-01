"use client";

import Table from "@/components/ui/Table";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import useCoupons from "@/hooks/coupons/useCoupons";
import useToast from "@/hooks/useToast";
import { deleteCouponAction, updateCouponAction } from "@/actions/couponActions";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import UpdateCouponModal from "@/components/ui/modal/coupon/UpdateCouponModal";
import { useLanguage } from "@/providers/LanguageProvider";
import DeleteModal from "@/components/ui/modal/DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import StatusDropdown from "@/components/shared/StatusDropdown";

const ACTIVE_COUPON_EXTENSION_DAYS = 30;

const CouponsTable = () => {
    const { language } = useLanguage();
    const isEn = language === "en";

    const searchParams = useSearchParams();
    const { user } = useAuth();
    const isInstructor = user?.role === "instructor";
    
    // Create a new URLSearchParams instance to manipulate the query
    const backendParams = new URLSearchParams(searchParams);
    // Remove local filters so they don't trigger API refetches
    backendParams.delete("status");
    const queryString = backendParams.toString();

    const { coupons, loading, error, meta, refetch } = useCoupons(queryString);
    const { successMessage, errorMessage } = useToast();
    const [deletingId, setDeletingId] = useState(null);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);
    const { requestDelete } = useDeleteModal();

    useEffect(() => {
        const handleCouponUpdated = () => {
            refetch();
        };
        window.addEventListener("coupon-updated", handleCouponUpdated);
        return () => {
            window.removeEventListener("coupon-updated", handleCouponUpdated);
        };
    }, [refetch]);

    const isExpired = (expireDate) => {
        const expiration = new Date(expireDate).getTime();
        return !Number.isFinite(expiration) || expiration <= Date.now();
    };

    const statusFilter = searchParams.get("status");

    // Local filtering in case the backend doesn't support the status parameter natively
    const filteredCoupons = coupons.filter(coupon => {
        if (isInstructor && user?._id) {
            const creatorId = coupon.createdBy?._id || coupon.createdBy;
            if (creatorId && creatorId !== user._id) return false;
        }
        if (!statusFilter) return true;
        const expired = isExpired(coupon.expire);
        if (statusFilter === "active") return !expired;
        if (statusFilter === "expired") return expired;
        return true;
    });

    const titleHead = isEn ? [
        "Coupon Code",
        "Discount Value",
        "Expiry Date",
        "Status",
        "Actions",
    ] : [
        "الكوبون",
        "قيمة الخصم",
        "تاريخ الانتهاء",
        "الحالة",
        "الإجراءات",
    ];

    const handleDelete = async (couponId) => {
        setDeletingId(couponId);
        const result = await deleteCouponAction(couponId);

        if (result.success) {
            successMessage(result.message || (isEn ? "Coupon deleted successfully" : "تم حذف الكوبون بنجاح"));
            refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to delete coupon" : "فشل حذف الكوبون"));
        }

        setDeletingId(null);
    };

    const handleDeleteRequest = (couponId) => {
        requestDelete({
            itemId: couponId,
            title: isEn ? "Delete Coupon" : "حذف الكوبون",
            message: isEn ? "Are you sure you want to delete this coupon? This action cannot be undone." : "هل أنت متأكد من حذف هذا الكوبون؟ لا يمكن التراجع عن هذا الإجراء.",
        });
    };

    const handleStatusChange = async (coupon, isActive) => {
        const currentlyActive = !isExpired(coupon.expire);
        if (currentlyActive === isActive) return;

        setUpdatingStatusId(coupon._id);

        const expire = isActive
            ? new Date(Date.now() + ACTIVE_COUPON_EXTENSION_DAYS * 24 * 60 * 60 * 1000).toISOString()
            : new Date(Date.now() - 1000).toISOString();

        const result = await updateCouponAction(coupon._id, { expire });

        if (result.success) {
            successMessage(result.message || (isEn ? "Coupon status updated successfully" : "تم تحديث حالة الكوبون بنجاح"));
            await refetch();
        } else {
            errorMessage(result.message || (isEn ? "Failed to update coupon status" : "فشل تحديث حالة الكوبون"));
        }

        setUpdatingStatusId(null);
    };

    const handleEditClick = (coupon) => {
        setEditingCoupon(coupon);
        setIsUpdateModalOpen(true);
    };

    if (loading) {
        return (
            <div className="mt-[20px] text-center py-10">
                <p className="text-text-secondary">{isEn ? "Loading coupons..." : "جاري تحميل الكوبونات..."}</p>
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
            {filteredCoupons.length === 0 ? (
                <div className="text-center py-6 text-text-muted">
                    {isEn ? "No coupons available" : "لا يوجد كوبونات متاحة"}
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
                            {filteredCoupons.map(coupon => (
                                <Table.Row key={coupon._id}>
                                    <Table.Td>
                                        <span className="font-mono font-bold text-primary">
                                            {coupon.name}
                                        </span>
                                    </Table.Td>

                                    <Table.Td>{coupon.discount}%</Table.Td>

                                    <Table.Td>
                                        {coupon.expire
                                            ? new Date(coupon.expire).toLocaleDateString(isEn ? "en-US" : "ar-EG")
                                            : "—"}
                                    </Table.Td>

                                    <Table.Td>
                                        <StatusDropdown
                                            isActive={!isExpired(coupon.expire)}
                                            activeLabel={isEn ? "Active" : "نشط"}
                                            inactiveLabel={isEn ? "Expired" : "منتهي"}
                                            disabled={updatingStatusId === coupon._id}
                                            onSelect={(newStatus) => handleStatusChange(coupon, newStatus)}
                                        />
                                    </Table.Td>

                                    <Table.Td>
                                        <ActionsTable
                                            actions={
                                                <div className="flex gap-3 justify-center items-center text-[20px]">
                                                    <MdOutlineEdit 
                                                        className="text-primary cursor-pointer" 
                                                        onClick={() => handleEditClick(coupon)}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="text-error cursor-pointer"
                                                        onClick={() => handleDeleteRequest(coupon._id)}
                                                        disabled={deletingId === coupon._id}
                                                    >
                                                        {deletingId === coupon._id ? (
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
                            ))}
                        </Table.Body>
                    </Table>

                    {meta?.hasMore && <LoadMore />}
                </div>
            )}

            <UpdateCouponModal
                isOpen={isUpdateModalOpen}
                onClose={() => {
                    setIsUpdateModalOpen(false);
                    setEditingCoupon(null);
                }}
                coupon={editingCoupon}
                onSuccess={() => {
                    setIsUpdateModalOpen(false);
                    setEditingCoupon(null);
                    refetch();
                }}
            />
            <DeleteModal onConfirmAction={handleDelete} />
        </div>
    );
};

export default CouponsTable;
