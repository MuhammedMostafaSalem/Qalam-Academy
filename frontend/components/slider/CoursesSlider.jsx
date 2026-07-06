import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { courses } from "@/constants/courses";
import CourseCard from "../courses/CourseCard";
import Slider from "../ui/Slider";

const CoursesSlider = () => {
    return (
        <Slider
            ButtonPrev={
                <button className="courses-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowBack size={22} />
                </button>
            }
            ButtonNext={
                <button className="courses-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowForward size={22} />
                </button>
            }
            prevEl=".courses-prev"
            nextEl=".courses-next"
        >
            {courses.map((course, index) => (
                <CourseCard key={index} course={course} />
            ))}
        </Slider>
    )
}

export default CoursesSlider