"use client";

import WishlistCard from "@/components/ui/WishlistCard";
import FullPageLoader from "@/components/ui/FullPageLoader";
import useWishlist from "@/hooks/wishlist/useWishlist";
import imgCourse from '@/public/assets/img-card.jpg';
import { useLanguage } from "@/providers/LanguageProvider";

const WishlistGrid = () => {
    const { language, localize } = useLanguage();
    const { wishlist, loading, removeFromWishlist } = useWishlist();

    if (loading) {
        return <FullPageLoader />;
    }

    if (wishlist.length === 0) {
        return (
            <div className="text-center py-12 text-text-muted">
                <p className="text-lg">
                    {language === "en" ? "No courses in your wishlist" : "لا توجد كورسات في المفضلة"}
                </p>
            </div>
        );
    }

    const defaultInstructor = language === "en" ? "Qalam Academy" : "أكاديمية قلم";

    const mappedCourses = wishlist.map((course) => ({
        _id: course._id,
        title: localize(course.title, language === "en" ? "Untitled Course" : "كورس بدون عنوان"),
        instructor: course.instructor
            ? `${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`.trim()
            : defaultInstructor,
        price: course.discountPrice > 0 ? course.discountPrice : course.price,
        image: course.thumbnail || imgCourse,
    }));

    return (
        <div className="flex-1">
            <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-6
            "
            >
                {mappedCourses.map((course) => (
                    <WishlistCard
                        key={course._id}
                        course={course}
                        onRemove={() => removeFromWishlist(course._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default WishlistGrid;
