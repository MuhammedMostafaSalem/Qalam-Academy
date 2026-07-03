import sidebarCourse from "./sidebarCourse";

const CoursePrice = () => {
    return (
        <div>
            <div className="flex items-end gap-3">
                <h2 className="text-4xl font-bold text-primary">
                    {sidebarCourse.price} ج.م
                </h2>

                <span
                    className="
                        text-xl
                        line-through
                        text-text-secondary
                    "
                >
                    {sidebarCourse.oldPrice} ج.م
                </span>
            </div>

            <p className="mt-3 text-sm text-green-500">
                وفر 40%
            </p>
        </div>
    );
};

export default CoursePrice;