import CourseActions from "./CourseActions";
import CourseFeatures from "./CourseFeatures";
import CoursePrice from "./CoursePrice";

const CourseSidebar = () => {
    return (
        <aside
            className="
                sticky
                top-28
                rounded-3xl
                border
                border-border
                bg-card
                p-7
            "
        >
            <CoursePrice />

            <div className="my-8">
                <CourseActions />
            </div>

            <hr className="border-border my-8" />

            <CourseFeatures />

            <p
                className="
                    mt-8
                    text-center
                    text-sm
                    text-text-secondary
                "
            >
                يمكنك الوصول إلى جميع الدروس مدى الحياة بعد الاشتراك.
            </p>
        </aside>
    );
};

export default CourseSidebar;