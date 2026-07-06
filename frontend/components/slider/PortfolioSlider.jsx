import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { projects } from "@/constants/projects";
import ProjectCard from "../portfolio/ProjectCard";
import Slider from '@/components/ui/Slider';

const PortfolioSlider = () => {
    return (
        <Slider
            ButtonPrev={
                <button className="projects-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowBack size={22} />
                </button>
            }
            ButtonNext={
                <button className="projects-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-button glass p-3">
                    <IoIosArrowForward size={22} />
                </button>
            }
            prevEl=".projects-prev"
            nextEl=".projects-next"
        >
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </Slider>
    )
}

export default PortfolioSlider