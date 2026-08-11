"use client";

import LoadMore from "@/components/shared/LoadMore";
import WishlistCard from "@/components/ui/WishlistCard";
import FullPageLoader from "@/components/ui/FullPageLoader";
import useWishlist from "@/hooks/wishlist/useWishlist";
import imgCourse from '@/public/assets/img-card.jpg';

const WishlistGrid = () => {
    const { wishlist, loading, removeFromWishlist } = useWishlist();

    if (loading) {
        return <FullPageLoader />;
    }

    if (wishlist.length === 0) {
        return (
            <div className="text-center py-12 text-text-muted">
                <p className="text-lg">لا توجد كورسات في المفضلة</p>
            </div>
        );
    }

    const mappedCourses = wishlist.map((course) => ({
        _id: course._id,
        title: typeof course.title === "object" ? (course.title.ar || course.title.en) : course.title,
        instructor: course.instructor
            ? `${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`.trim()
            : "أكاديمية قلم",
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

            {wishlist.length >= 6 && <LoadMore />}
        </div>
    );
};


export default WishlistGrid;