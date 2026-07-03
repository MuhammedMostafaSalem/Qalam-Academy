import { DEFAULT_DURATION, DEFAULT_EASING, DEFAULT_OFFSET } from "./aos";

const createAnimation = (
    animation,
    delay = 0,
    options = {}
) => ({
    "data-aos": animation,
    "data-aos-delay": delay,
    "data-aos-duration": options.duration ?? DEFAULT_DURATION,
    "data-aos-easing": options.easing ?? DEFAULT_EASING,
    "data-aos-offset": options.offset ?? DEFAULT_OFFSET,
    "data-aos-once": options.once ?? true,
});

export const fadeUp = (delay = 0, options = {}) =>
    createAnimation("fade-up", delay, options);

export const fadeDown = (delay = 0, options = {}) =>
    createAnimation("fade-down", delay, options);

export const fadeLeft = (delay = 0, options = {}) =>
    createAnimation("fade-left", delay, options);

export const fadeRight = (delay = 0, options = {}) =>
    createAnimation("fade-right", delay, options);

export const fadeIn = (delay = 0, options = {}) =>
    createAnimation("fade", delay, options);

export const zoomIn = (delay = 0, options = {}) =>
    createAnimation("zoom-in", delay, options);

export const zoomOut = (delay = 0, options = {}) =>
    createAnimation("zoom-out", delay, options);

export const zoomInUp = (delay = 0, options = {}) =>
    createAnimation("zoom-in-up", delay, options);

export const zoomInDown = (delay = 0, options = {}) =>
    createAnimation("zoom-in-down", delay, options);

export const flipLeft = (delay = 0, options = {}) =>
    createAnimation("flip-left", delay, options);

export const flipRight = (delay = 0, options = {}) =>
    createAnimation("flip-right", delay, options);

export const flipUp = (delay = 0, options = {}) =>
    createAnimation("flip-up", delay, options);

export const flipDown = (delay = 0, options = {}) =>
    createAnimation("flip-down", delay, options);

export const slideUp = (delay = 0, options = {}) =>
    createAnimation("slide-up", delay, options);

export const slideDown = (delay = 0, options = {}) =>
    createAnimation("slide-down", delay, options);