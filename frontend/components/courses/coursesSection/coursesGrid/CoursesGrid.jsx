import { fadeUp } from "@/lib/animationHelpers";
import CourseCard from "../../CourseCard";
import { courses } from "./courses";
import LoadMore from "./LoadMore";
import { heroAnimation } from "@/lib/animation/heroAnimation";
import { animations } from "@/lib/animations";
import { cardAnimation } from "@/lib/animation/cardAnimation";


const CoursesGrid = ({ view }) => {
    return (
        <div className="flex-1">
            {/* Result Count */}
            <div
                className="
                    mb-8
                    flex
                    items-center
                    justify-between
                "
            >
                <h2
                    {...heroAnimation.title}
                    className={`
                        text-2xl
                        font-bold
                        ${animations.transition}
                    `}
                >
                    جميع الكورسات
                </h2>

                <span
                    {...heroAnimation.badge}
                    className={`text-text-secondary ${animations.transition}`}>
                    {courses.length} دورة
                </span>
            </div>

            {/* Grid */}
            <div
                {...fadeUp()}
                className={`
                    grid
                    gap-8
                    ${view === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                        : "grid-cols-1"
                    }
                `}
            >
                {courses.map((course, index) => (
                    <div key={index} {...cardAnimation(index)}>
                        <CourseCard
                            course={course}
                        />
                    </div>
                ))}
            </div>

            <LoadMore />
        </div>
    );
};

export default CoursesGrid;