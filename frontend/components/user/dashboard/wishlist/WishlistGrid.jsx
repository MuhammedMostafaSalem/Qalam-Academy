import LoadMore from "@/components/shared/LoadMore";
import WishlistCard from "@/components/ui/WishlistCard";
import imgCourse from '@/public/assets/img-card.jpg';

const courses = [
    {
        id: 1,
        title: "تعلم Next.js من الصفر للاحتراف",
        instructor: "Qalam Academy",
        price: "499",
        image: imgCourse,
    },
    {
        id: 2,
        title: "React Advanced",
        instructor: "Ahmed Academy",
        price: "399",
        image: imgCourse,
    },
    {
        id: 3,
        title: "UI/UX Design",
        instructor: "Sara Ahmed",
        price: "299",
        image: imgCourse,
    },
];


const WishlistGrid = () => {
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
                {courses.map((course) => (
                    <WishlistCard
                        key={course.id}
                        course={course}
                    />
                ))}
            </div>

            <LoadMore />
        </div>
    );
};


export default WishlistGrid;