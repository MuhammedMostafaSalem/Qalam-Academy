import LessonsTable from "./LessonsTable"
import LessonToolbar from "./LessonToolbar"

const Lesson = ({ courseId }) => {
    return (
        <>
            <LessonToolbar courseId={courseId} />

            <LessonsTable courseId={courseId} />
        </>
    )
}

export default Lesson