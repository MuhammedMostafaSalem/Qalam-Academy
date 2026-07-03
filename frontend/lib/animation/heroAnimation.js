import { fadeDown, fadeUp, zoomIn } from "../animationHelpers";

export const heroAnimation = {
    badge: fadeDown(0),

    title: fadeUp(100),

    description: fadeUp(200),

    buttons: fadeUp(300),

    image: zoomIn(400),
};