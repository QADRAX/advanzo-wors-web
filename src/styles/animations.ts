export const ANIMATION_EASING = [0.6, -0.05, 0.01, 0.99];

export const ANIMATION_VERTICAL_FADE = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: ANIMATION_EASING },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: ANIMATION_EASING,
        },
    },
    exit: {
        y: -60,
        opacity: 0,
        transition: { duration: 0.3, ease: ANIMATION_EASING },
    }
};