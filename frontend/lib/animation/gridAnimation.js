import { fadeUp } from "../animationHelpers";

export const gridAnimation = (
    index = 0,
    step = 100
) =>
    fadeUp(index * step);