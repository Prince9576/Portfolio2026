const TV_SCREEN_SIZE_UNITS = {
    width: 2.84534 * 1.75,
    height: 1.56355 * 1.75,
}

const screenWidth = 1920;
const screenHeight = Math.round(screenWidth * (TV_SCREEN_SIZE_UNITS.height / TV_SCREEN_SIZE_UNITS.width));
const SCREEN_SCALE = TV_SCREEN_SIZE_UNITS.width / screenWidth;


const LAPTOP_CAMERA_VIEW = {
    position: { x: 0.15, y: 0.25, z: 0.12 },
    target: { x: 3.66, y: -4.96, z: -7.59 },
    rotation: { x: -0.35, y: -0.29, z: -0.01, w: 1 }
}

const TV_CAMERA_VIEW = {
    position: { x: -0.9, y: 1.3, z: -1.2 },
    target: { x: 3.6, y: 0.3, z: -2.7 },
    rotation: { x: -0.16, y: -0.6, z: 0.09, w: 1 }
}

const TV_CAMERA_VIEW_PORTRAIT = {
    position: { x: -1.2, y: 1.57, z: -0.3 },
    target: { x: 3.6, y: 0.3, z: -2.7 },
    rotation: { x: -0.5, y: -0.2, z: 0.63, w: 0.61 }
}

const PHONE_CAMERA_VIEW = {
    position: { x: 0.288, y: 0.1, z: 3.0 },
    target: { x: 3.9, y: 0.5, z: 1.2 },
    rotation: { x: -1, y: -0.2, z: -0.2, w: 1 }
}

const BG_START_TIME = 4000;


export { TV_SCREEN_SIZE_UNITS, SCREEN_SCALE, screenWidth as SCREEN_WIDTH, screenHeight as SCREEN_HEIGHT, LAPTOP_CAMERA_VIEW, TV_CAMERA_VIEW, TV_CAMERA_VIEW_PORTRAIT, PHONE_CAMERA_VIEW, BG_START_TIME };