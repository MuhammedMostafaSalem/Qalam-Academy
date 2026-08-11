import CourseInfoForm from "./CourseInfoForm"
import CourseInfoToolbar from "./CourseInfoToolbar"

const Info = ({ courseId }) => {
    return (
        <>
            <CourseInfoToolbar />
            <CourseInfoForm courseId={courseId} />
        </>
    )
}

export default Info