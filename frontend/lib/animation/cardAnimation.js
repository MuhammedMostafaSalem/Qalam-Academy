import { fadeUp } from "../animationHelpers";

export const cardAnimation = (
    index = 0,
    options = {}
) =>
    fadeUp(index * 100, options);