import Aos from "aos"
import "aos/dist/aos.css"

export const DEFAULT_DURATION = 800;
export const DEFAULT_EASING = "ease-out-cubic";
export const DEFAULT_OFFSET = 80;

export const initAOS = () => {
    Aos.init({
        duration: DEFAULT_DURATION,
        easing: DEFAULT_EASING,
        once: true,
        mirror: false,
        offset: DEFAULT_OFFSET,
        delay: 0,
    });
}

export const refreshAOS = () => {
    Aos.refresh();
}