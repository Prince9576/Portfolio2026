const TV_SCREEN_SIZE_UNITS = {
    width: 2.84534 * 1.75,
    height: 1.56355 * 1.75,
}

const screenWidth = 1920;   // Pixel resolution
const screenHeight = Math.round(screenWidth * (TV_SCREEN_SIZE_UNITS.height / TV_SCREEN_SIZE_UNITS.width)); // 1055
const SCREEN_SCALE = TV_SCREEN_SIZE_UNITS.width / screenWidth; // 0.00148


export { TV_SCREEN_SIZE_UNITS, SCREEN_SCALE, screenWidth as SCREEN_WIDTH, screenHeight as SCREEN_HEIGHT };