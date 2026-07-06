import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { testimonials } from "@/constants/testimonials";
import TestimonialCard from "../home/testimonials/TestimonialCard";
import Slider from '@/components/ui/Slider';

const TestimonialsSlider = () => {
    return (
        <Slider
            ButtonPrev={
                <button className="testi-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 p-3">
                    <IoIosArrowBack size={22} />
                </button>
            }
            ButtonNext={
                <button className="testi-next absolute right-0 top-1/2 z-10 -translate-y-1/2 p-3">
                    <IoIosArrowForward size={22} />
                </button>
            }
            prevEl=".testi-prev"
            nextEl=".testi-next"
        >
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                />
            ))}
        </Slider>
    )
}

export default TestimonialsSlider