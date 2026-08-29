"use client";

import Table from "@/components/ui/Table";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import LoadMore from "@/components/shared/LoadMore";
import ActionsTable from "@/components/shared/ActionsTable";
import useCoupons from "@/hooks/coupons/useCoupons";
import useToast from "@/hooks/useToast";
import { deleteCouponAction } from "@/actions/couponActions";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import UpdateCouponModal from "@/components/ui/modal/coupon/UpdateCouponModal";
import { useLanguage } from "@/providers/LanguageProvider";

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
        const expiration = new Date(expireDate);
        const now = new Date();
        return expiration.getTime() < now.getTime();
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
        if (!confirm(isEn ? "Are you sure you want to delete this coupon?" : "هل أنت متأكد من حذف هذا الكوبون؟")) return;

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
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                isExpired(coupon.expire)
                                                    ? "bg-error/20 text-error"
                                                    : "bg-success/20 text-success"
                                            }`}
                                        >
                                            {isExpired(coupon.expire) ? (isEn ? "Expired" : "منتهي") : (isEn ? "Active" : "نشط")}
                                        </span>
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
                                                        onClick={() => handleDelete(coupon._id)}
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
        </div>
    );
};

export default CouponsTable;
