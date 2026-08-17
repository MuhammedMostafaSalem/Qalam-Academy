import LearningPoints from "./LearningPoints";
import Requirements from "./Requirements";

const OverviewContent = ({ course }) => {
    return (
        <div className="flex flex-col">
            {/* Learning Points */}
            <LearningPoints objectives={course?.objectives} />

            {/* Requirements */}
            <Requirements requirements={course?.requirements} />
        </div>
    );
};

export default OverviewContent;