"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { addToWishlistAction, removeFromWishlistAction } from "@/actions/wishlistActions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CourseActions = ({ course }) => {
    const router = useRouter();
    const [isInWishlist, setIsInWishlist] = useState(course?.isInWishlist || false);
    const [isLoading, setIsLoading] = useState(false);
    const isEnrolled = course?.isEnrolled || false;

    const handleWishlistToggle = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            if (isInWishlist) {
                const result = await removeFromWishlistAction(course._id);
                if (result.success) {
                    setIsInWishlist(false);
                }
            } else {
                const result = await addToWishlistAction(course._id);
                if (result.success) {
                    setIsInWishlist(true);
                }
            }
        } catch (error) {
            console.error("Wishlist error:", error);
        } finally {
            setIsLoading(false);
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
        <div className="space-y-4">
            <Button
                className="gradient-button w-full"
            >
                <Link href="#">
                    اشترك الآن
                </Link>
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