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

function isLandscape() {
  let landscape = window.matchMedia("(orientation: landscape)").matches;
  return landscape;
}

window.addEventListener("orientationchange", () => {
  if (world) world.stopGame();
  if (world) world.stopEnterMenu();
  world = null;
  init();
});
