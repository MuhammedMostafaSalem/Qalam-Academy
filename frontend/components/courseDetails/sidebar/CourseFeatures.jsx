import sidebarCourse from "./sidebarCourse";

const CourseFeatures = () => {
    return (
        <div className="space-y-5">
            {sidebarCourse.features.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.label}
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <Icon
                                size={22}
                                className="text-primary"
                            />
                            <span>{item.label}</span>
                        </div>

                        <span className="text-text-secondary">
                            {item.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default CourseFeatures;