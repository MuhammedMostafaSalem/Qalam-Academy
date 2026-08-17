"use client";

import Button from "@/components/ui/Button";
import { addToWishlistAction, removeFromWishlistAction } from "@/actions/wishlistActions";
import { addToCartAction } from "@/actions/cartActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

const CourseActions = ({ course }) => {
    const router = useRouter();
    const { successMessage, errorMessage } = useToast();
    const [isInWishlist, setIsInWishlist] = useState(course?.isInWishlist || false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);
    const isEnrolled = course?.isEnrolled || false;

    const handleWishlistToggle = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            if (isInWishlist) {
                const result = await removeFromWishlistAction(course._id);
                if (result.success) {
                    setIsInWishlist(false);
                    successMessage(result.message || "تم إزالة الكورس من المفضلة");
                } else {
                    errorMessage(result.message);
                }
            } else {
                const result = await addToWishlistAction(course._id);
                if (result.success) {
                    setIsInWishlist(true);
                    successMessage(result.message || "تمت إضافة الكورس إلى المفضلة");
                } else {
                    errorMessage(result.message);
                }
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            errorMessage("حدث خطأ أثناء تعديل المفضلة");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = async (redirectToCart = false) => {
        if (isAddingCart) return;
        setIsAddingCart(true);
        try {
            const result = await addToCartAction(course._id, "Course");
            if (result.success) {
                successMessage(result.message || "تمت الإضافة إلى السلة");
                if (redirectToCart) {
                    router.push("/cart");
                }
            } else {
                errorMessage(result.message);
            }
        } catch (error) {
            errorMessage("يرجى تسجيل الدخول أولاً لإضافة الكورس للسلة");
        } finally {
            setIsAddingCart(false);
        }
    };

    if (isEnrolled) {
        return (
            <div className="space-y-4">
                <Button
                    className="gradient-button w-full"
                    onClick={() => router.push(`/courses/${course.slug}/lesson/${course.lessons?.[0]?._id}`)}
                >
                    متابعة التعلم
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <Button
                className="gradient-button w-full"
                onClick={() => handleAddToCart(true)}
                disabled={isAddingCart}
            >
                {isAddingCart ? "جاري الإضافة..." : "اشترك الآن"}
            </Button>

            <Button
                variant="outline"
                className="w-full text-white border-white/20 hover:border-primary"
                onClick={() => handleAddToCart(false)}
                disabled={isAddingCart}
            >
                إضافة إلى السلة
            </Button>

            <Button
                variant="outline"
                className="w-full"
                onClick={handleWishlistToggle}
                disabled={isLoading}
            >
                {isLoading 
                    ? "جاري التحميل..." 
                    : isInWishlist 
                        ? "إزالة من المفضلة" 
                        : "إضافة إلى المفضلة"
                }
            </Button>
        </div>
    );
};

export default CourseActions;