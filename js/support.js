/**
 * checks if the playing device is a mobile device
 * @returns {boolean}
 */
function isMobile() {
  let mediaWidth = window.matchMedia("(max-width: 768px)").matches;
  let canvasWidth = canvas.width < 720;
  let isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  let isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  return mediaWidth || canvasWidth || isMobile || isTouchDevice;
}

/**
 * checks if the screenorientation of the device is landscape
 * @returns {boolean}
 */
function isLandscape() {
  let landscape = window.matchMedia("(orientation: landscape)").matches;
  return landscape;
}

/**
 * listens on an possiböle orientation change of the device. 
 */
window.addEventListener("orientationchange", () => {
  if (world) world.stopGame();
  if (world) world.stopEnterMenu();
  world = null;
  init();
});

/**
 * initiates debug mode
 */
function debug(){
  if(world){
    world.debug=true;
  }
}
