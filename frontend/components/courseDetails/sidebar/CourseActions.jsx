"use client";

import Button from "@/components/ui/Button";
import { addToWishlistAction, removeFromWishlistAction } from "@/actions/wishlistActions";
import { addToCartAction } from "@/actions/cartActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/providers/LanguageProvider";

const CourseActions = ({ course }) => {
    const router = useRouter();
    const { language } = useLanguage();
    const isEn = language === "en";
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
                    successMessage(result.message || (isEn ? "Course removed from wishlist" : "تم إزالة الكورس من المفضلة"));
                } else {
                    errorMessage(result.message);
                }
            } else {
                const result = await addToWishlistAction(course._id);
                if (result.success) {
                    setIsInWishlist(true);
                    successMessage(result.message || (isEn ? "Course added to wishlist" : "تمت إضافة الكورس إلى المفضلة"));
                } else {
                    errorMessage(result.message);
                }
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            errorMessage(isEn ? "An error occurred while updating wishlist" : "حدث خطأ أثناء تعديل المفضلة");
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
                successMessage(result.message || (isEn ? "Added to cart" : "تمت الإضافة إلى السلة"));
                if (redirectToCart) {
                    router.push("/cart");
                }
            } else {
                errorMessage(result.message);
            }
        } catch (error) {
            errorMessage(isEn ? "Please login first to add course to cart" : "يرجى تسجيل الدخول أولاً لإضافة الكورس للسلة");
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
                    {isEn ? "Continue Learning" : "متابعة التعلم"}
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
                {isAddingCart
                    ? (isEn ? "Adding..." : "جاري الإضافة...")
                    : (isEn ? "Enroll Now" : "اشترك الآن")}
            </Button>

            <Button
                variant="outline"
                className="w-full text-text-primary border-border hover:border-primary"
                onClick={() => handleAddToCart(false)}
                disabled={isAddingCart}
            >
                {isEn ? "Add to Cart" : "إضافة إلى السلة"}
            </Button>

            <Button
                variant="outline"
                className="w-full"
                onClick={handleWishlistToggle}
                disabled={isLoading}
            >
                {isLoading
                    ? (isEn ? "Loading..." : "جاري التحميل...")
                    : isInWishlist
                        ? (isEn ? "Remove from Wishlist" : "إزالة من المفضلة")
                        : (isEn ? "Add to Wishlist" : "إضافة إلى المفضلة")
                }
            </Button>
        </div>
    );
};

export default CourseActions;
