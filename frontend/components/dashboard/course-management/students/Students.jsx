import StudentsTable from "./StudentsTable"
import StudentsToolbar from "./StudentsToolbar"

const Students = ({ courseId }) => {
    return (
        <>
            <StudentsToolbar />
            <StudentsTable courseId={courseId} />
        </>
    )
}

export default Students
