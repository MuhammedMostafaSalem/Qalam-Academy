import LessonsTable from "./LessonsTable"
import LessonToolbar from "./LessonToolbar"

const Lesson = ({ courseId, courseSlug }) => {
    return (
        <>
            <LessonToolbar courseSlug={courseSlug} />

            <LessonsTable courseId={courseId} courseSlug={courseSlug} />
        </>
    )
}

export default Lesson
